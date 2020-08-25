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
      console.log(token, "in the test");
      const res = await supertest(server)
        .get("/api/users")
        .set("Authorization", `${token}`);

      expect(res).toBe(11);
    });
  });
});
