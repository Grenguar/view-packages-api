import PackagesFileParser from "../parser/packagesFileParser";
import { IPackageInfo } from "../domain/packageInfo";

export default class PackagesServiceV1 {
  public packagesFileParser: PackagesFileParser;

  constructor(sourceFilePath: string) {
    this.packagesFileParser = new PackagesFileParser(sourceFilePath);
  }

  public getNames(): string[] {
    return this.packagesFileParser.getPackageNames();
  }

  public getPackageInfo(name: string): IPackageInfo | null {
    try {
      const packageDescription: string | null = this.packagesFileParser.findPackageByName(name);
      if (packageDescription) {
        const packageInfo: IPackageInfo = this.packagesFileParser.getPackageInfo(packageDescription);
        return packageInfo;
      }
    } catch (e) {
      throw new Error("Package cannot be found");
    }
    return null;
  }
}
