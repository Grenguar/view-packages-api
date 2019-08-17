import express from "express";

export const app: express.Application = express();

const mainRoute: string = "/api/packages";

app.get(`${mainRoute}/`, (req, res) => {
  res.status(200).send("List of all packages");
});

app.get(`${mainRoute}/:package-name`, (req, res) => {
  res.status(200).send(req.params);
});

export default app;
