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
  });
}
