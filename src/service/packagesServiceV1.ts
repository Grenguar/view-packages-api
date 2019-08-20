import PackagesFileParser from "../parser/packagesFileParser";
import { PackageInfo } from "../domain/packageInfo";

export default class PackagesServiceV1 {
  sourceFilePath: string;
  packagesFileParser: PackagesFileParser;

  constructor(sourceFilePath: string) {
    this.sourceFilePath = sourceFilePath;
    this.packagesFileParser = new PackagesFileParser(sourceFilePath);
  }

  public getNames(): string[] {
    const packagesDescriptions: string[] = this.packagesFileParser.getRawPackageDescriptions();
    const allNames: string[] = [];
    packagesDescriptions.forEach(packageDesc => {
      allNames.push(this.packagesFileParser.getPackageName(packageDesc));
    });
    return allNames;
  }

  public getPackageInfo(name: string): PackageInfo | null {
    const packagesDescriptions: string[] = this.packagesFileParser.getRawPackageDescriptions();
    let packageDescription = null;
    for (let current of packagesDescriptions) {
      const currentName = this.packagesFileParser.getPackageName(current);
      if (currentName === name) {
        packageDescription = current;
        break;
      }
    }
    if (packageDescription) {
      return this.packagesFileParser.getPackageInfo(packageDescription);
    }
    return null;
  }
}
