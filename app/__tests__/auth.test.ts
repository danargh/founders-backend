import request from "supertest";
import app from "../index";
import { closeDBTesting, connectDBTesting } from "./test.utils";

describe("Register /auth/login", () => {
   beforeAll(async () => {
      await connectDBTesting();
   });
   afterAll(async () => {
      await closeDBTesting();
   });

   // success case
   test("It should return 200 and a token", async () => {
      const response = await request(app).post("/auth/login").send({
         email: "danar@gmail.com",
         password: "12345678",
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
   });
});
