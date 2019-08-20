import PackagesFileParser from "../utils/packagesFileParser";
import { PackageInfo } from "../domain/packageInfo";

let exp = expect as jest.Expect;

if (PackagesFileParser) {
  describe("Test file parser", () => {
    test("Read file - exampleFile", async () => {
      const packagesFileParser: PackagesFileParser = new PackagesFileParser("../../files/exampleFile");
      const fileContent: string = packagesFileParser.readFile();
      exp(fileContent).toBe("hello, fileReader!");
    });

    test("Get modules as strings - status.short", async () => {
      const packagesFileParser: PackagesFileParser = new PackagesFileParser("../../files/status.short");
      const fileContent: string = packagesFileParser.readFile();
      const modulesArray = packagesFileParser.getModulesAsStrings(fileContent);
      exp(modulesArray.length).toBe(5);
    });

    test("Get module name from a string - status.short", async () => {
      const packagesFileParser: PackagesFileParser = new PackagesFileParser("../../files/status.short");
      const fileContent: string = packagesFileParser.readFile();
      const modulesArray = packagesFileParser.getModulesAsStrings(fileContent);
      const moduleName: string = packagesFileParser.getModuleName(modulesArray[2]);
      exp(moduleName.trim()).toBe("tcpd");
    });

    test("Get module info from a string - status.short", async () => {
      const packagesFileParser: PackagesFileParser = new PackagesFileParser("../../files/status.short");
      const fileContent: string = packagesFileParser.readFile();
      const modulesArray = packagesFileParser.getModulesAsStrings(fileContent);
      const moduleInfo: PackageInfo = packagesFileParser.getPackageInfo(modulesArray[1]);
      exp(moduleInfo).toStrictEqual({
        name: "python-pkg-resources",
        depends: ["python"],
        description:
          'Package Discovery and Resource Access using pkg_resources The pkg_resources module provides an API for Python libraries to access their resource files, and for extensible applications and frameworks to automatically discover plugins.  It also provides runtime support for using C extensions that are inside zipfile-format eggs, support for merging packages that have separately-distributed modules or subpackages, and APIs for managing Python\'s current "working set" of active packages.',
        dependents: ["tcpd", "libbsf-java"]
      });
    });

    test("Get module info from a string about dependents - status.real", async () => {
      const packagesFileParser: PackagesFileParser = new PackagesFileParser("../../files/status.real");
      const fileContent: string = packagesFileParser.readFile();
      const modulesArray = packagesFileParser.getModulesAsStrings(fileContent);
      const moduleInfo: PackageInfo = packagesFileParser.getPackageInfo(modulesArray[1]);
      exp(moduleInfo.dependents).toStrictEqual([
        "python-zope.interface",
        "python-lazr.uri",
        "python-wadllib",
        "python-lazr.restfulclient"
      ]);
    });
  });
}
