import express from "express";
import PackagesServiceV1 from "./service/packagesServiceV1";
import { IPackageInfo, IPackageInfoHAL } from "./domain/packageInfo";
import PackagesServiceV2 from "./service/packagesServiceV2";
import HALlink from "./domain/halLink";
import IError from "./domain/error";

export const app: express.Application = express();

const mainRoute: string = "/api/v1/packages";
const mainRouteV2: string = "/api/v2/packages";

const packagesFilePath: string = "../../files/status.real";
const packagesService: PackagesServiceV1 = new PackagesServiceV1(packagesFilePath);
const packagesServiceV2: PackagesServiceV2 = new PackagesServiceV2(packagesFilePath);
const successCode: number = 200;
const clientErrorCode: number = 400;
const packageNotFoundError: IError = {
  type: "Package Not Found Error",
  status: 400,
  message: "Check the name of the package from packages list by calling main endpoint",
};

app.get(`${mainRoute}/`, (req, res) => {
  const moduleNames: string[] = packagesService.getNames();
  res.status(successCode).send({
    packages: moduleNames,
  });
});

app.get(`${mainRoute}/:package`, (req, res) => {
  try {
    const params: any = req.params;
    const packageInfo: IPackageInfo | null = packagesService.getPackageInfo(params.package);
    res.status(successCode).send(packageInfo);
  } catch (e) {
    res.status(clientErrorCode).send(packageNotFoundError);
  }
});

app.get(`${mainRouteV2}/`, (req, res) => {
  const hostPath: string = `${req.headers.host}${mainRouteV2}`;
  const packageNamesHAL: HALlink[] = packagesServiceV2.getAllPackagesNamesWithHAL(hostPath);
  res
    .set("Content-Type", "application/hal+json")
    .status(successCode)
    .send({
      packages: packageNamesHAL,
    });
});

app.get(`${mainRouteV2}/:package`, (req, res) => {
  try {
    const hostPath: string = `${req.headers.host}${mainRouteV2}`;
    const params: any = req.params;
    const packageInfo: IPackageInfoHAL | null = packagesServiceV2.getPackageInfoWithHAL(params.package, hostPath);
    res
      .set("Content-Type", "application/hal+json")
      .status(successCode)
      .send(packageInfo);
  } catch (e) {
    res.status(clientErrorCode).send(packageNotFoundError);
  }
});

export default app;
