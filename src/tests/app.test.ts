import app from "../app";
import request from "supertest";

let exp = expect as jest.Expect;

const routeV1: string = "/api/v1/packages";

if (app) {
  describe("Test the packages path", () => {
    test("Main route test", async () => {
      const response = await request(app).get(`${routeV1}/`);
      exp(response.status).toBe(200);
      exp(response.body.packages.length > 0).toBe(true);
    });

    test("Package info of libxau6", async () => {
      const testPackage: string = "libxau6";
      const response = await request(app).get(`${routeV1}/${testPackage}`);
      exp(response.status).toBe(200);
      exp(response.body.name).toBe(testPackage);
    });

    test("Package info of tcpd", async () => {
      const testPackage: string = "tcpd";
      const response = await request(app).get(`${routeV1}/${testPackage}`);
      exp(response.status).toBe(200);
      exp(response.body.name).toBe(testPackage);
      exp(response.body.depends.length).toBe(2);
    });

    test("Main route v2 test", async () => {
      const response = await request(app).get("/api/v2/packages/");
      exp(response.status).toBe(200);
      exp(response.header["content-type"].indexOf("application/hal+json") > -1).toBe(true);
    });

    test("Package info v2 test", async () => {
      const testPackage: string = "tcpd";
      const response = await request(app).get(`/api/v2/packages/${testPackage}`);
      exp(response.status).toBe(200);
      exp(response.header["content-type"].indexOf("application/hal+json") > -1).toBe(true);
    });
  });
}
