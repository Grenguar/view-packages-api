import StringToHALConverter from "../converter/stringToHALConverter";
import HALlink from "../domain/halLink";

const exp = expect as jest.Expect;
let hostPath = "localhost:8080/apiv2/packages";

if (StringToHALConverter) {
  beforeAll(() => {});
  describe("Test StringToHALConverter", () => {
    test("Get HALLink for the module named libaspectj-java", async () => {
      const moduleTest = "libaspectj-java";
      const halLink: HALlink = StringToHALConverter.convert(moduleTest, hostPath);
      console.log(halLink);
      exp(halLink._links.self.href).toBe(`http://localhost:8080/apiv2/packages/${moduleTest}-name`);
    });
  });
}
