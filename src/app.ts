import express from "express";
import PackagesFileParser from "./utils/packagesFileParser";
import PackagesServiceV1 from "./service/packagesServiceV1";
import { PackageInfo } from "./domain/packageInfo";
import PackagesServiceV2 from "./service/packagesServiceV2";
import HALlink from "./domain/halLink";

export const app: express.Application = express();

const mainRoute: string = "/api/packages";
const mainRouteV2: string = "/apiv2/packages";

const packagesFilePath: string = "../../files/status.real";
const packagesService: PackagesServiceV1 = new PackagesServiceV1();
const packagesServiceV2: PackagesServiceV2 = new PackagesServiceV2();

app.get(`${mainRoute}/`, (req, res) => {
  const moduleNames: string[] = packagesService.getAllPackagesNames(packagesFilePath);
  res.status(200).send({
    packages: moduleNames
  });
});

app.get(`${mainRoute}/:package-name`, (req, res) => {
  const params: any = req.params;
  const packageInfo: PackageInfo | null = packagesService.getPackageInfo(params.package, packagesFilePath);
  if (typeof packageInfo === null) {
    res.status(401).end("Error occured. Check the name of the package or the file");
  }
  res.status(200).send(packageInfo);
});

app.get(`${mainRouteV2}/`, (req, res) => {
  const hostPath: string = `localhost:8080${mainRoute}`;
  const packageNamesHAL: HALlink[] = packagesServiceV2.getAllPackagesNamesWithHAL(packagesFilePath, hostPath);
  res.status(200).send({
    packages: packageNamesHAL
  });
});

export default app;
