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
    this.getModuleDescription(moduleDesc);
    let packageInfo: PackageInfo = {
      name: this.getModuleName(moduleDesc),
      depends: this.getModuleDependsInfo(moduleDesc),
      description: this.getModuleDescription(moduleDesc).replace(/\n/g, "")
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
        .trim()
        .split(" , ");
      return this.deleteDuplicatesFromArray(moduleDepends);
    }
    return ["no dependencies"];
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
}
