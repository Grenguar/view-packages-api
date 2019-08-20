import * as fs from "fs";
import * as path from "path";
import { PackageInfo } from "../domain/packageInfo";

export default class PackagesFileParser {
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  public readFile(): string {
    const fileContent = fs.readFileSync(path.join(__dirname, this.filePath), "utf8");
    return fileContent;
  }

  public getModulesAsStrings(fileContent: string): string[] {
    const modulesArray: string[] = fileContent.split("Package: ");
    modulesArray.shift();
    return modulesArray;
  }

  public getModuleName(moduleDesc: string): string {
    return moduleDesc.substring(0, moduleDesc.indexOf("\n") + 1).trim();
  }

  public getPackageInfo(moduleDesc: string): PackageInfo {
    let packageInfo: PackageInfo = {
      name: this.getModuleName(moduleDesc),
      depends: this.getModuleDependsInfo(moduleDesc),
      description: this.getModuleDescription(moduleDesc).replace(/\n/g, ""),
      dependents: this.getModuleDependents(moduleDesc)
    };
    return packageInfo;
  }

  private getModuleDependsInfo(moduleDesc: string): string[] {
    let moduleDepends: string[] = [];
    const regExDepends: RegExp = /(?:Depends: )(.*)/;
    const regExRoundBrackets: RegExp = /((\((.*?)\))*)/g;
    if (regExDepends.test(moduleDesc) && typeof moduleDesc.match(regExDepends) !== null) {
      const matchArray = regExDepends.exec(moduleDesc);
      moduleDepends = matchArray![1]
        .replace(regExRoundBrackets, "")
        .replace(/\s+/g, "")
        .split(",");
      return this.deleteDuplicatesFromArray(moduleDepends);
    }
    return [];
  }

  private deleteDuplicatesFromArray(array: string[]): string[] {
    return array.filter(function(item, pos) {
      return array.indexOf(item) == pos;
    });
  }

  private getModuleDescription(moduleDesc: string) {
    const regExDescription: RegExp = /(?:Description: )([\w\W]*)(?:Original-Maintainer)/g;
    if (regExDescription.test(moduleDesc) && typeof moduleDesc.match(regExDescription) !== null) {
      const matchArray = regExDescription.exec(moduleDesc);
      return matchArray![1];
    }
    return "no description provided";
  }

  private getModuleDependents(moduleDesc: string): string[] {
    let dependents: string[] = [];
    const moduleName: string = this.getModuleName(moduleDesc);
    const modulesAsStrings: string[] = this.getModulesAsStrings(this.readFile());
    for (let currentModule of modulesAsStrings) {
      const currentModuleName = this.getModuleName(currentModule);
      if (moduleName !== currentModule && this.findValueInArray(moduleName, this.getModuleDependsInfo(currentModule))) {
        dependents.push(currentModuleName);
      }
    }
    return dependents;
  }

  private findValueInArray(value: string, array: string[]): boolean {
    return array.indexOf(value) !== -1;
  }
}
