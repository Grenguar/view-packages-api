import PackagesService from "../service/packagesService";

const exp = expect as jest.Expect;
const STATUS_SHORT_FILEPATH = "../../files/status.short";

let packagesService: PackagesService;

if (PackagesService) {
  describe("Test packages service", () => {
    beforeAll(() => {
      packagesService = new PackagesService();
    });

    test("Get all modules list from status.short", async () => {
      const allModuleNames: string[] = packagesService.getAllModuleNames(STATUS_SHORT_FILEPATH);
      exp(allModuleNames.length).toBe(5);
    });

    test("Get module info from status.short", async () => {
      const packageInfo = packagesService.getPackageInfo("libws-commons-util-java", STATUS_SHORT_FILEPATH);
      exp(packageInfo!.name).toBe("libws-commons-util-java");
    });
  });
}
