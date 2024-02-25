import request from "supertest";
import app from "../index";
import mongoose from "mongoose";
import { deleteUserByEmail } from "models/users";

describe("Register /auth/register", () => {
   // beforeAll(async () => {
   //    // Delete user if exists
   //    await deleteUserByEmail("john@gmail.com");
   // });
   afterEach(async () => {
      await deleteUserByEmail("john@gmail.com");
   });

   // success case
   it("should return 201 if register successfull", async () => {
      const response = await request(app).post("/auth/register").send({
         email: "john@gmail.com",
         username: "john",
         password: "12345678",
      });
      expect(response.status).toEqual(201);
   });

   // afterAll((done) => {
   //    // Closing the DB connection allows Jest to exit successfully.
   //    mongoose.connection.close();
   //    done();
   // });
});
