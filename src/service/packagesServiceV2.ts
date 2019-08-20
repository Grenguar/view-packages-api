import PackagesServiceV1 from "./packagesServiceV1";
import HALLink from "../domain/halLink";
import StringToHALConverter from "../converter/stringToHALConverter";
import { PackageInfoHAL } from "../domain/packageInfo";
import PackagesFileParser from "../utils/packagesFileParser";

export default class PackagesServiceV2 extends PackagesServiceV1 {
  public getAllPackagesNamesWithHAL(filePath: string, host: string): HALLink[] {
    let halLinks: HALLink[] = [];
    let packageNames: string[] = this.getAllPackagesNames(filePath);
    packageNames.forEach(element => {
      halLinks.push(StringToHALConverter.convert(element, host));
    });
    return halLinks;
  }

  public getPackageInfoWithHAL(moduleName: string, filePath: string, host: string): PackageInfoHAL | null {
    const packagesFileParser: PackagesFileParser = new PackagesFileParser(filePath);
    const fileContent: string = packagesFileParser.readFile();
    const packagesArray: string[] = packagesFileParser.getPackagesAsString(fileContent);
    let packageInfoHal = null;
    packagesArray.forEach((currentModule, index, array) => {
      const currentModuleName = packagesFileParser.getPackageName(currentModule);
      if (currentModuleName === moduleName) {
        packageInfoHal = packagesFileParser.getPackageInfoHAL(currentModule, host);
        let currIndex = index;
        let nextIndex = currIndex + 1;
        let prevIndex = currIndex - 1;
        if (nextIndex !== array.length && array[nextIndex]) {
          packageInfoHal.next = StringToHALConverter.convert(packagesFileParser.getPackageName(array[nextIndex]), host);
        }
        if (prevIndex > -1 && array[prevIndex]) {
          packageInfoHal.prev = StringToHALConverter.convert(packagesFileParser.getPackageName(array[prevIndex]), host);
        }
        return;
      }
    });
    return packageInfoHal;
  }
}
