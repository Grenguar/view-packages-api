import PackagesFileParser from "../utils/packagesFileParser";
import { PackageInfo } from "../domain/packageInfo";

export default class PackagesServiceV1 {
  public getAllPackagesNames(filePath: string): string[] {
    const packagesFileParser: PackagesFileParser = new PackagesFileParser(filePath);
    const fileContent: string = packagesFileParser.readFile();
    const modulesArray: string[] = packagesFileParser.getPackagesAsString(fileContent);
    const allModuleNames: string[] = [];
    modulesArray.forEach(moduledesc => {
      allModuleNames.push(packagesFileParser.getPackageName(moduledesc));
    });
    return allModuleNames;
  }

  public getPackageInfo(moduleName: string, filePath: string): PackageInfo | null {
    const packagesFileParser: PackagesFileParser = new PackagesFileParser(filePath);
    const fileContent: string = packagesFileParser.readFile();
    const modulesArray: string[] = packagesFileParser.getPackagesAsString(fileContent);
    let module = null;
    for (let currentModule of modulesArray) {
      const currentModuleName = packagesFileParser.getPackageName(currentModule);
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
