import PackagesService from "../service/packagesServiceV1";
import PackagesServiceV2 from "../service/packagesServiceV2";
import HALlink from "../domain/halLink";

const exp = expect as jest.Expect;
const STATUS_SHORT_FILEPATH = "../../files/status.short";
const HOST = "localhost:8080/apiv2/packages";

let packagesService: PackagesService;
let packagesServiceV2: PackagesServiceV2;

if (PackagesService) {
  describe("Test packages service", () => {
    beforeAll(() => {
      packagesService = new PackagesService(STATUS_SHORT_FILEPATH);
      packagesServiceV2 = new PackagesServiceV2(STATUS_SHORT_FILEPATH);
    });

    test("Get all packages list from status.short - packagesServiceV1", async () => {
      const allModuleNames: string[] = packagesService.getNames();
      exp(allModuleNames.length).toBe(5);
    });

    test("Get package info from status.short - packagesServiceV1", async () => {
      const packageInfo = packagesService.getPackageInfo("libws-commons-util-java");
      exp(packageInfo!.name).toBe("libws-commons-util-java");
    });

    test("Get all packages list from status.short - packagesServiceV2", async () => {
      const allModuleNames: HALlink[] = packagesServiceV2.getAllPackagesNamesWithHAL(HOST);
      exp(allModuleNames.length).toBe(5);
    });

    test("Get package info libws-commons-util-java from status.short - packagesServiceV2", async () => {
      const packageInfo = packagesServiceV2.getPackageInfoWithHAL("libws-commons-util-java", HOST);
      exp(packageInfo!.name).toBe("libws-commons-util-java");
      exp(packageInfo!.next!.name).toBe("python-pkg-resources");
    });

    test("Get package info libaspectj-java from status.short - packagesServiceV2", async () => {
      const packageInfo = packagesServiceV2.getPackageInfoWithHAL("libaspectj-java", HOST);
      exp(packageInfo!.name).toBe("libaspectj-java");
      exp(packageInfo!.next!.name).toBe("libbsf-java");
      // tslint:disable-next-line:no-unused-expression
      exp(packageInfo!.prev!).toBeNull;
    });

    test("Get package info tcpd from status.short - packagesServiceV2", async () => {
      const packageInfo = packagesServiceV2.getPackageInfoWithHAL("tcpd", HOST);
      exp(packageInfo!.name).toBe("tcpd");
      // tslint:disable-next-line:no-unused-expression
      exp(packageInfo!.next!).toBeNull;
      exp(packageInfo!.prev!.name).toBe("python-pkg-resources");
    });
  });
}
