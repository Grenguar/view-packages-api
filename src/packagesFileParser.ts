import * as fs from "fs";
import * as path from "path";

export default class PackagesFileParser {
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  public readFile(): string {
    const fileData = fs.readFileSync(path.join(__dirname, this.filePath), "utf8");
    return fileData;
  }

  public getModulesAsStrings(fileContent: string): string[] {
    const modulesArray: string[] = fileContent.split("Package: ");
    modulesArray.shift();
    return modulesArray;
  }

  public getModuleName(moduleDesc: string): string {
    return moduleDesc.substring(0, moduleDesc.indexOf("\n") + 1).trim();
  }

  public getAllModuleNames(fileContent: string): string[] {
    const modulesArray: string[] = this.getModulesAsStrings(fileContent);
    const allModuleNames: string[] = [];
    modulesArray.forEach(moduledesc => {
      allModuleNames.push(this.getModuleName(moduledesc));
    });
    allModuleNames.sort();
    return allModuleNames;
  }
}
