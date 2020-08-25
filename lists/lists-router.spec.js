//Natalia
const supertest = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

const testUser = {
  username: "testuser1234",
  password: "testing123",
};

<<<<<<< HEAD
describe.skip("lists-router", () => {
=======
describe("lists-router", () => {
>>>>>>> 6f029ae0c3144e912d35421a4b3cc5696abfa380
  //next batch of code is for storing token to use to access restricted
  let token;
  beforeEach((done) => {
    supertest(server) //server = router components (change the name as needed)
      .post("/api/auth/login")
      .send(testUser) //testUser = an object at the top of the page
      .end((err, response) => {
        token = response.body.token;
        console.log(response.body);
        done();
      });
  });
  //STORE DONE

  describe("GET /api/lists", () => {
    it("returns 401 without token", async () => {
      const res = await supertest(server).get("/api/jokes");

      expect(res.status).toBe(401);
    });

    it("access the route with a token", async () => {
      const res = await supertest(server)
        .get("/api/lists")
        .set("Authorization", `${token}`);
      const test = await db("users");
      console.log(test);
      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
    });
  });
});
