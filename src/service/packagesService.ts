import PackagesFileParser from "../utils/packagesFileParser";
import { PackageInfo } from "../domain/packageInfo";

export default class PackagesService {
  public getAllModuleNames(filePath: string): string[] {
    const packagesFileParser: PackagesFileParser = new PackagesFileParser(filePath);
    const fileContent: string = packagesFileParser.readFile();
    const modulesArray: string[] = packagesFileParser.getModulesAsStrings(fileContent);
    const allModuleNames: string[] = [];
    modulesArray.forEach(moduledesc => {
      allModuleNames.push(packagesFileParser.getModuleName(moduledesc));
    });
    allModuleNames.sort();
    return allModuleNames;
  }

  public getPackageInfo(moduleName: string, filePath: string): PackageInfo | null {
    const packagesFileParser: PackagesFileParser = new PackagesFileParser(filePath);
    const fileContent: string = packagesFileParser.readFile();
    const modulesArray: string[] = packagesFileParser.getModulesAsStrings(fileContent);
    let module = null;
    for (let currentModule of modulesArray) {
      const currentModuleName = packagesFileParser.getModuleName(currentModule);
      if (currentModuleName === moduleName) {
        module = currentModule;
        break;
      }
    }
    if (module) {
      return packagesFileParser.getPackageInfo(module);
    }
    return null;
  }
}
