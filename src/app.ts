import express from "express";
import PackagesFileParser from "./packagesFileParser";

export const app: express.Application = express();

const mainRoute: string = "/api/packages";

const packagesFileParser: PackagesFileParser = new PackagesFileParser("../files/status.real");
const fileContent: string = packagesFileParser.readFile();

app.get(`${mainRoute}/`, (req, res) => {
  const moduleNames: string[] = packagesFileParser.getAllModuleNames(fileContent);
  res.status(200).send({
    modules: moduleNames
  });
});

app.get(`${mainRoute}/:package-name`, (req, res) => {
  res.status(200).send(req.params);
});

export default app;
