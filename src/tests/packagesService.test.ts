import PackagesService from "../service/packagesService";

const exp = expect as jest.Expect;
const STATUS_SHORT_FILEPATH = "../../files/status.short";

if (PackagesService) {
  describe("Test packages service", () => {
    test("Get all modules list from status.short", async () => {
      const packagesService: PackagesService = new PackagesService();
      const allModuleNames: string[] = packagesService.getAllModuleNames(STATUS_SHORT_FILEPATH);
      exp(allModuleNames.length).toBe(5);
    });
  });
}
