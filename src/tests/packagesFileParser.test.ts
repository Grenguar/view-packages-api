import PackagesFileParser from "../utils/packagesFileParser";
import { PackageInfo } from "../domain/packageInfo";

let exp = expect as jest.Expect;

if (PackagesFileParser) {
  describe("Test PackagesFileParser", () => {
    test("Read file - exampleFile", async () => {
      const packagesFileParser: PackagesFileParser = new PackagesFileParser("../../files/exampleFile");
      const fileContent: string = packagesFileParser.readFile();
      exp(fileContent).toBe("hello, fileReader!");
    });

    test("Get modules as strings - status.short", async () => {
      const packagesFileParser: PackagesFileParser = new PackagesFileParser("../../files/status.short");
      const fileContent: string = packagesFileParser.readFile();
      const modulesArray = packagesFileParser.getPackagesAsString(fileContent);
      exp(modulesArray.length).toBe(5);
    });

    test("Get module name from a string - status.short", async () => {
      const packagesFileParser: PackagesFileParser = new PackagesFileParser("../../files/status.short");
      const fileContent: string = packagesFileParser.readFile();
      const modulesArray = packagesFileParser.getPackagesAsString(fileContent);
      const moduleName: string = packagesFileParser.getPackageName(modulesArray[2]);
      exp(moduleName.trim()).toBe("libws-commons-util-java");
    });

    test("Get package info python-pkg-resources from a string - status.short", async () => {
      const packagesFileParser: PackagesFileParser = new PackagesFileParser("../../files/status.short");
      const fileContent: string = packagesFileParser.readFile();
      const modulesArray = packagesFileParser.getPackagesAsString(fileContent);
      const moduleInfo: PackageInfo = packagesFileParser.getPackageInfo(modulesArray[3]);
      exp(moduleInfo).toStrictEqual({
        name: "python-pkg-resources",
        depends: ["python"],
        description:
          'Package Discovery and Resource Access using pkg_resources The pkg_resources module provides an API for Python libraries to access their resource files, and for extensible applications and frameworks to automatically discover plugins.  It also provides runtime support for using C extensions that are inside zipfile-format eggs, support for merging packages that have separately-distributed modules or subpackages, and APIs for managing Python\'s current "working set" of active packages.',
        dependents: ["libbsf-java", "tcpd"]
      });
    });

    test("Get module info from a string about dependents - status.real", async () => {
      const packagesFileParser: PackagesFileParser = new PackagesFileParser("../../files/status.real");
      const fileContent: string = packagesFileParser.readFile();
      const modulesArray = packagesFileParser.getPackagesAsString(fileContent);
      const moduleInfo: PackageInfo = packagesFileParser.getPackageInfo(modulesArray[3]);
      exp(moduleInfo.dependents).toStrictEqual(["ant-optional", "velocity"]);
    });
  });
}
