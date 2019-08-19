import PackagesFileParser from "../utils/packagesFileParser";

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
}
