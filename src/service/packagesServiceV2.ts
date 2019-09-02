import PackagesServiceV1 from "./packagesServiceV1";
import HALLink from "../domain/halLink";
import StringToHALConverter from "../converter/stringToHALConverter";
import { PackageInfoHAL } from "../domain/packageInfo";
import PackagesFileParser from "../parser/packagesFileParser";

export default class PackagesServiceV2 extends PackagesServiceV1 {
  public getAllPackagesNamesWithHAL(host: string): HALLink[] {
    const halLinks: HALLink[] = [];
    this.getNames().forEach(element => {
      halLinks.push(StringToHALConverter.convert(element, host));
    });
    return halLinks;
  }

  public getPackageInfoWithHAL(moduleName: string, host: string): PackageInfoHAL | null {
    const packagesArray: string[] = this.packagesFileParser.getRawPackageDescriptions();
    let packageInfoHal: any = null;
    packagesArray.forEach((currentModule, index, array) => {
      const currentModuleName = this.packagesFileParser.getPackageName(currentModule);
      if (currentModuleName === moduleName) {
        packageInfoHal = this.savePackageInfoHal(
          packageInfoHal,
          this.packagesFileParser,
          currentModule,
          host,
          index,
          array,
        );
        return;
      }
    });
    return packageInfoHal;
  }

  private savePackageInfoHal(
    packageInfoHal: PackageInfoHAL,
    packagesFileParser: PackagesFileParser,
    currentModule: string,
    host: string,
    index: number,
    array: string[],
  ) {
    packageInfoHal = packagesFileParser.getPackageInfoHAL(currentModule, host);
    const currIndex = index;
    const nextIndex = currIndex + 1;
    const prevIndex = currIndex - 1;
    if (nextIndex !== array.length && array[nextIndex]) {
      packageInfoHal.next = StringToHALConverter.convert(packagesFileParser.getPackageName(array[nextIndex]), host);
    }
    if (prevIndex > -1 && array[prevIndex]) {
      packageInfoHal.prev = StringToHALConverter.convert(packagesFileParser.getPackageName(array[prevIndex]), host);
    }
    return packageInfoHal;
  }
}
