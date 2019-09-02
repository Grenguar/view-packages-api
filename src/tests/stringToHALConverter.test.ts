import StringToHALConverter from "../converter/stringToHALConverter";
import HALlink from "../domain/halLink";

const exp = expect as jest.Expect;
const hostPath = "localhost:8080/apiv2/packages";

if (StringToHALConverter) {
  describe("Test StringToHALConverter", () => {
    test("Get HALLink for the module named libaspectj-java", async () => {
      const testPackage = "libaspectj-java";
      const halLink: HALlink = StringToHALConverter.convert(testPackage, hostPath);
      exp(halLink._links.self.href).toBe(`http://localhost:8080/apiv2/packages/${testPackage}`);
      exp(halLink.name).toBe(testPackage);
    });
  });
}
