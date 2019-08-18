import PackagesFileParser from "../packagesFileParser";

let exp = expect as jest.Expect;

if (PackagesFileParser) {
  describe("Test file parser", () => {
    test("Read file - exampleFile", async () => {
      const packagesFileParser: PackagesFileParser = new PackagesFileParser("../files/exampleFile");
      const fileContent: string = packagesFileParser.readFile();
      exp(fileContent).toBe("hello, fileReader!");
    });

    test("Get modules as strings - status.short", async () => {
      const packagesFileParser: PackagesFileParser = new PackagesFileParser("../files/status.short");
      const fileContent: string = packagesFileParser.readFile();
      const modulesArray = packagesFileParser.getModulesAsStrings(fileContent);
      exp(modulesArray.length).toBe(5);
    });

    test("Get module name from a string - status.short", async () => {
      const packagesFileParser: PackagesFileParser = new PackagesFileParser("../files/status.short");
      const fileContent: string = packagesFileParser.readFile();
      const modulesArray = packagesFileParser.getModulesAsStrings(fileContent);
      const moduleName: string = packagesFileParser.getModuleName(modulesArray[2]);
      exp(moduleName.trim()).toBe("tcpd");
    });

    test("Get all modules list from status.short", async () => {
      const packagesFileParser: PackagesFileParser = new PackagesFileParser("../files/status.short");
      const fileContent: string = packagesFileParser.readFile();
      const allModuleNames: string[] = packagesFileParser.getAllModuleNames(fileContent);
      exp(allModuleNames.length).toBe(5);
    });
  });
}
