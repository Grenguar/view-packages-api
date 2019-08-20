import PackagesFileParser from "../parser/packagesFileParser";
import { PackageInfo } from "../domain/packageInfo";

let exp = expect as jest.Expect;

let packagesFileParser: PackagesFileParser;
let packagesDescriptions: string[];
let statusShortPath: string = "../../files/status.short";

if (PackagesFileParser) {
  beforeAll(() => {
    packagesFileParser = new PackagesFileParser(statusShortPath);
  });

  describe("Test PackagesFileParser", () => {
    test("Get modules as strings - status.short", async () => {
      exp(packagesFileParser.getRawPackageDescriptions().length).toBe(5);
    });

    test("Get module name from a string - status.short", async () => {
      const packagesDescriptions = packagesFileParser.getRawPackageDescriptions();
      const moduleName: string = packagesFileParser.getPackageName(packagesDescriptions[2]);
      exp(moduleName.trim()).toBe("libws-commons-util-java");
    });

    test("Get package info python-pkg-resources from a string - status.short", async () => {
      const packagesDescriptions = packagesFileParser.getRawPackageDescriptions();
      const packageInfo: PackageInfo = packagesFileParser.getPackageInfo(packagesDescriptions[3]);
      exp(packageInfo).toStrictEqual({
        name: "python-pkg-resources",
        depends: ["python"],
        description:
          'Package Discovery and Resource Access using pkg_resources The pkg_resources module provides an API for Python libraries to access their resource files, and for extensible applications and frameworks to automatically discover plugins.  It also provides runtime support for using C extensions that are inside zipfile-format eggs, support for merging packages that have separately-distributed modules or subpackages, and APIs for managing Python\'s current "working set" of active packages.',
        dependents: ["libbsf-java", "tcpd"]
      });
    });

    test("Get module info from a string about dependents - status.real", async () => {
      const statusRealPath: string = "../../files/status.real";
      packagesFileParser.setFilePath(statusRealPath);
      const packagesDescriptions = packagesFileParser.getRawPackageDescriptions();
      const packageInfo: PackageInfo = packagesFileParser.getPackageInfo(packagesDescriptions[3]);
      exp(packageInfo.dependents).toStrictEqual(["ant-optional", "velocity"]);
    });
  });
}
