import PackagesFileParser from "../parser/packagesFileParser";
import { PackageInfo } from "../domain/packageInfo";

export default class PackagesServiceV1 {
  public packagesFileParser: PackagesFileParser;

  constructor(sourceFilePath: string) {
    this.packagesFileParser = new PackagesFileParser(sourceFilePath);
  }

  public getNames(): string[] {
    return this.packagesFileParser.getPackageNames();
  }

  public getPackageInfo(name: string): PackageInfo | null {
    const packageDescription: string | null = this.packagesFileParser.findPackageByName(name);
    if (packageDescription) {
      return this.packagesFileParser.getPackageInfo(packageDescription);
    }
    return null;
  }
}
