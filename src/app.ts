import express from "express";
import PackagesFileParser from "./utils/packagesFileParser";
import PackagesService from "./service/packagesService";

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
  res.status(200).send(req.params);
});

export default app;
