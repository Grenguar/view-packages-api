import * as fs from "fs";
import * as path from "path";
import { PackageInfo, PackageInfoHAL } from "../domain/packageInfo";
import HALlink from "../domain/halLink";
import StringToHALConverter from "../converter/stringToHALConverter";

export default class PackagesFileParser {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  public setFilePath(filePath: string): void {
    this.filePath = filePath;
  }

  public getRawPackageDescriptions(): string[] {
    const packages: string[] = this.readFile().split("Package: ");
    packages.shift();
    packages.sort();
    return packages;
  }

  public getPackageName(packageDesc: string): string {
    return packageDesc.substring(0, packageDesc.indexOf("\n") + 1).trim();
  }

  public getPackageNames(): string[] {
    const packageNames: string[] = [];
    this.getRawPackageDescriptions().forEach(packageDesc => {
      packageNames.push(this.getPackageName(packageDesc));
    });
    return packageNames;
  }

  public findPackageByName(packageName: string): string | null {
    let packageDescription = null;
    for (let current of this.getRawPackageDescriptions()) {
      const currentName = this.getPackageName(current);
      if (currentName === packageName) {
        packageDescription = current;
        break;
      }
    }
    return packageDescription;
  }

  public getPackageInfo(packageDesc: string): PackageInfo {
    let packageInfo: PackageInfo = {
      name: this.getPackageName(packageDesc),
      description: this.getPackageDescription(packageDesc).replace(/\n/g, ""),
      depends: this.getPackageDependsInfo(packageDesc),
      dependents: this.getPackageDependents(packageDesc)
    };
    return packageInfo;
  }

  public getPackageInfoHAL(moduleDesc: string, hostPath: string): PackageInfoHAL {
    let packageInfo: PackageInfoHAL = {
      name: this.getPackageName(moduleDesc),
      description: this.getPackageDescription(moduleDesc),
      _embedded: {
        depends: this.convertPackages(this.getPackageDependsInfo(moduleDesc), moduleDesc, hostPath),
        dependents: this.convertPackages(this.getPackageDependents(moduleDesc), moduleDesc, hostPath)
      }
    };
    return packageInfo;
  }

  private readFile(): string {
    const fileContent = fs.readFileSync(path.join(__dirname, this.filePath), "utf8");
    return fileContent;
  }

  private getPackageDependsInfo(moduleDesc: string): string[] {
    let moduleDepends: string[] = [];
    const regExDepends: RegExp = /(?:Depends: )(.*)/;
    const regExRoundBrackets: RegExp = /((\((.*?)\))*)/g;
    if (regExDepends.test(moduleDesc) && typeof moduleDesc.match(regExDepends) !== null) {
      const matchArray = regExDepends.exec(moduleDesc);
      moduleDepends = matchArray![1]
        .replace(regExRoundBrackets, "")
        .replace(/\s+/g, "")
        .split(",");
      return this.arrayWithoutDuplicates(moduleDepends);
    }
    return moduleDepends;
  }

  private arrayWithoutDuplicates(array: string[]): string[] {
    return array.filter((item, pos) => {
      return array.indexOf(item) == pos;
    });
  }

  private getPackageDescription(moduleDesc: string) {
    const regExDescription: RegExp = /(?:Description: )([\w\W]*)(?:Original-Maintainer)/g;
    if (regExDescription.test(moduleDesc) && typeof moduleDesc.match(regExDescription) !== null) {
      const matchArray = regExDescription.exec(moduleDesc);
      return matchArray![1].replace(/\n/g, "");
    }
    return "no description provided";
  }

  private getPackageDependents(moduleDesc: string): string[] {
    let dependents: string[] = [];
    const moduleName: string = this.getPackageName(moduleDesc);
    const modulesAsStrings: string[] = this.getRawPackageDescriptions();
    for (let currentModule of modulesAsStrings) {
      const currentModuleName = this.getPackageName(currentModule);
      if (
        moduleName !== currentModule &&
        this.findValueInArray(moduleName, this.getPackageDependsInfo(currentModule))
      ) {
        dependents.push(currentModuleName);
      }
    }
    return dependents;
  }

  private findValueInArray(value: string, array: string[]): boolean {
    return array.indexOf(value) !== -1;
  }

  private convertPackages(packages: string[], moduleDesc: string, hostPath: string): HALlink[] {
    let halArray: HALlink[] = [];
    if (packages.length === 0) {
      return [];
    }
    packages.forEach(element => {
      const halLink: HALlink = StringToHALConverter.convert(element, hostPath);
      if (halLink.name !== "null") {
        halArray.push(StringToHALConverter.convert(element, hostPath));
      }
    });
    return halArray;
  }
}
