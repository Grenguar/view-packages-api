import express from "express";
import PackagesServiceV1 from "./service/packagesServiceV1";
import { PackageInfo, PackageInfoHAL } from "./domain/packageInfo";
import PackagesServiceV2 from "./service/packagesServiceV2";
import HALlink from "./domain/halLink";

export const app: express.Application = express();

const mainRoute: string = "/api/v1/packages";
const mainRouteV2: string = "/api/v2/packages";

const packagesFilePath: string = "../../files/status.real";
const packagesService: PackagesServiceV1 = new PackagesServiceV1(packagesFilePath);
const packagesServiceV2: PackagesServiceV2 = new PackagesServiceV2(packagesFilePath);

app.get(`${mainRoute}/`, (req, res) => {
  const moduleNames: string[] = packagesService.getNames();
  res.status(200).send({
    packages: moduleNames
  });
});

app.get(`${mainRoute}/:package`, (req, res) => {
  const params: any = req.params;
  const packageInfo: PackageInfo | null = packagesService.getPackageInfo(params.package);
  if (typeof packageInfo === null) {
    res.status(400).end("Error occured. Check the name of the package or the file");
  }
  res.status(200).send(packageInfo);
});

app.get(`${mainRouteV2}/`, (req, res) => {
  const hostPath: string = `${req.headers.host}${mainRouteV2}`;
  const packageNamesHAL: HALlink[] = packagesServiceV2.getAllPackagesNamesWithHAL(hostPath);
  res
    .set("Content-Type", "application/hal+json")
    .status(200)
    .send({
      packages: packageNamesHAL
    });
});

app.get(`${mainRouteV2}/:package`, (req, res) => {
  const hostPath: string = `${req.headers.host}${mainRouteV2}`;
  const params: any = req.params;
  const packageInfo: PackageInfoHAL | null = packagesServiceV2.getPackageInfoWithHAL(params.package, hostPath);
  if (typeof packageInfo === null) {
    res.status(400).end("Error occured. Check the name of the package or the file");
  }
  res
    .set("Content-Type", "application/hal+json")
    .status(200)
    .send(packageInfo);
});

export default app;
