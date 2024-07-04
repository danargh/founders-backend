import request from "supertest";
import app from "../../index";
import { closeDBTesting, connectDBTesting } from "../test.utils";
import { deleteUserByEmail } from "../../models/users";

// auth login
describe("Login /auth/login", () => {
   beforeAll(async () => {
      await connectDBTesting();
   });
   afterAll(async () => {
      await closeDBTesting();
   });

   // success case
   test("It should return 200 and a token", async () => {
      const response = await request(app).post("/auth/login").send({
         email: "danargh06@gmail.com",
         password: "12345678",
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
   });
});

// auth register
describe("Register /auth/register", () => {
   beforeAll(async () => {
      await connectDBTesting();
      await deleteUserByEmail("danargh86@gmail.com");
   });
   afterAll(async () => {
      await closeDBTesting();
   });

   // success case
   test("It should return 200 and a token", async () => {
      const response = await request(app).post("/auth/register").send({
         email: "danargh86@gmail.com",
         username: "danargh",
         password: "12345678",
         repeatPassword: "12345678",
         phone: "08123456789",
         terms: true,
      });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("data");
   });
});
