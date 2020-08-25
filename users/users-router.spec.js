const supertest = require("supertest");

const server = require("../api/server");
const db = require("../database/dbConfig");

const testLogin = {
  username: "testuser1234",
  password: "testing123",
};

//next batch of code is for storing token to use to access restricted
let token;
beforeAll((done) => {
  supertest(server)
    .post("/api/auth/login")
    .send(testLogin)
    .end((err, response) => {
      token = response.body.token;
      done();
    });
});
//STORE DONE

//Shaun
describe("users-router", () => {
  describe("GET /api/users", () => {
    it("returns 401 without token", async () => {
      const res = await supertest(server).get("/api/users");

      expect(res.status).toBe(401);
    });

    it("accesses the route with a token", async () => {
      const res = await supertest(server)
        .get("/api/users")
        .set("Authorization", `${token}`);

      expect(res.status).toBe(200);
    });

    it("returns information", async () => {
        const res = await supertest(server)
          .get("/api/users")
          .set("Authorization", `${token}`);
  
        expect(res.body).toHaveProperty('data');
      });
  });
  describe("GET /api/users/:id", () => {
    it("returns 401 without token", async () => {
      const res = await supertest(server).get("/api/users/1");

      expect(res.status).toBe(401);
    });

    it("accesses the route with a token", async () => {
      const res = await supertest(server)
        .get("/api/users/1")
        .set("Authorization", `${token}`);

      expect(res.status).toBe(200);
    });

    it("returns information", async () => {
        const res = await supertest(server)
          .get("/api/users/1")
          .set("Authorization", `${token}`);
  
        expect(res.body).toHaveProperty('username');
    });

    it("returns 404 if id is not in db", async () => {
        const res = await supertest(server)
          .get("/api/users/5")
          .set("Authorization", `${token}`);
  
        expect(res.status).toBe(404);
      });
  });
});
