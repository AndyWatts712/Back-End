const supertest = require("supertest");

const server = require("../api/server");
const db = require("../database/dbConfig");

const testRegister = {
  username: "testuser1234",
  password: "testing123",
  email: "testuser1234@testing.com",
};
const testLogin = {
  username: "testuser1234",
  password: "testing123",
};

describe.skip("/api/auth", () => {
  //Register
  describe("POST /register", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
    it("receives a status 201", async () => {
      const res = await supertest(server)
        .post("/api/auth/register")
        .send(testRegister);

      expect(res.status).toBe(201);
    });
    it("can post a new user", async () => {
      const res = await supertest(server)
        .post("/api/auth/register")
        .send(testRegister);

      const test = await db("users");

      expect(test).toHaveLength(1);
    });
  });
  //Login - Shaun
  describe("POST /login", () => {
    it("returns status 200", async () => {
      const res = await supertest(server)
        .post("/api/auth/login")
        .send(testLogin);

      expect(res.status).toBe(200);
    });
    it("returns a token", async () => {
      const res = await supertest(server)
        .post("/api/auth/login")
        .send(testLogin);

      expect(res.body).toMatchObject(/token/i);
      expect(res.type).toMatch(/jon/i);
    });
  });
});
