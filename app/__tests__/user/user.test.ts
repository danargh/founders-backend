import request from "supertest";
import app from "../../index";
import { closeDBTesting, connectDBTesting } from "../test.utils";

describe("GET /user", () => {
   beforeAll(async () => {
      await connectDBTesting();
   });
   afterAll(async () => {
      await closeDBTesting();
   });

   it("should return user data with a valid token", async () => {
      const response = await request(app)
         .get("/user")
         .set(
            "Authorization",
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3Zjk0NjRlZGRkYzY2NTc1NDkzZTYiLCJ1c2VybmFtZSI6ImRhbmFyIiwiZW1haWwiOiJkYW5hcmdoMDZAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTk2MzM1MTMsImV4cCI6MTcxOTY0MDcxM30.6hFAe8ABhwRiXdRqRgzS9ngZ3JN5uYxYusiXyvQ6BLk"
         );

      expect(response.status).toBe(200);
   });

   it("should return 401 if token is missing", async () => {
      const response = await request(app).get("/user");

      expect(response.status).toBe(401);
   });
});
