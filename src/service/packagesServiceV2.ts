import PackagesServiceV1 from "./packagesServiceV1";
import HALLink from "../domain/halLink";
import StringToHALConverter from "../converter/stringToHALConverter";

export default class PackagesServiceV2 extends PackagesServiceV1 {
  public getAllPackagesNamesWithHAL(filePath: string, host: string): HALLink[] {
    let halLinks: HALLink[] = [];
    let packageNames: string[] = this.getAllPackagesNames(filePath);
    packageNames.forEach(element => {
      halLinks.push(StringToHALConverter.convert(element, host));
    });
    return halLinks;
  }
}
