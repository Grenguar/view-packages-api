import app from "../app";
import request from "supertest";

let exp = expect as jest.Expect;

if (app) {
  describe("Test the packages path", () => {
    test("Main route test", async () => {
      const response = await request(app).get("/api/packages/");
      exp(response.status).toBe(200);
    });

    test("Package route test", async () => {
      const response = await request(app).get("/api/packages/some-name");
      exp(response.status).toBe(200);
    });

    test("Package info of libxau6", async () => {
      const testPackage: string = "libxau6";
      const response = await request(app).get(`/api/packages/${testPackage}-name`);
      exp(response.status).toBe(200);
      exp(response.body.name).toBe(testPackage);
    });

    test("Package info of tcpd", async () => {
      const testPackage: string = "tcpd";
      const response = await request(app).get(`/api/packages/${testPackage}-name`);
      exp(response.status).toBe(200);
      exp(response.body.name).toBe(testPackage);
      exp(response.body.depends.length).toBe(2);
    });

    test("Main route v2 test", async () => {
      const response = await request(app).get("/apiv2/packages/");
      exp(response.status).toBe(200);
    });
  });
}
