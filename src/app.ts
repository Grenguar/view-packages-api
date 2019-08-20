import express from "express";
import PackagesFileParser from "./utils/packagesFileParser";
import PackagesService from "./service/packagesService";
import { PackageInfo } from "./domain/packageInfo";

export const app: express.Application = express();

const mainRoute: string = "/api/packages";

const packagesFilePath: string = "../../files/status.real";
const packagesService: PackagesService = new PackagesService();

app.get(`${mainRoute}/`, (req, res) => {
  const moduleNames: string[] = packagesService.getAllModuleNames(packagesFilePath);
  res.status(200).send({
    modules: moduleNames
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

export default app;
