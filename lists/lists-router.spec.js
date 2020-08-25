//Natalia
const supertest = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

const testUser = {
  username: "testuser1234",
  password: "testing123",
};
const testUpdate = {
  name: "updatedlist",
};
const testList = {
  name: "testlist",
  type_id: "1",
};

describe("lists-router", () => {
  //next batch of code is for storing token to use to access restricted
  let token;
  beforeEach((done) => {
    supertest(server) //server = router components (change the name as needed)
      .post("/api/auth/login")
      .send(testUser) //testUser = an object at the top of the page
      .end((err, response) => {
        token = response.body.token;
        // console.log(response.body);
        done();
      });
  });
  //STORE DONE

  describe("GET /api/lists", () => {
    beforeAll(async () => {
      await db("lists").truncate();
    });
    it("returns 401 without token", async () => {
      const res = await supertest(server).get("/api/lists");

      expect(res.status).toBe(401);
    });

    it("access the route with a token", async () => {
      const res = await supertest(server)
        .get("/api/lists")
        .set("Authorization", `${token}`);
      const test = await db("lists");

      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
    });

    it("GET /api/lists - returns information", async () => {
      const res = await supertest(server)
        .get("/api/lists")
        .set("Authorization", `${token}`);

      expect(res.body).toHaveProperty("data");
    });
  });

  describe("POST /api/list", () => {
    it("POST / a list ", async () => {
      const res = await supertest(server)
        .post("/api/lists")
        .send(testList)
        .set("Authorization", `${token}`);

      expect(res.body).toHaveProperty("data.name");
    });
  });

  describe("PUT /api/lists/:id", () => {
    it("returns UPDATED information", async () => {
      const res = await supertest(server)
        .put("/api/lists/1")
        .send(testUpdate)
        .set("Authorization", `${token}`);
      //   const test = await db("lists");
      //   console.log(test);

      expect(res.body).toHaveProperty("data.name");
    });

    it.skip("returns 404 if id is not in db", async () => {
      const res = await supertest(server)
        .put("/api/lists/1")
        .send(testUpdate)
        .set("Authorization", `${token}`);

      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /api/lists/:id", () => {
    it("returns 401 without token", async () => {
      const res = await supertest(server).delete("/api/lists/1");

      expect(res.status).toBe(401);
    });

    it("DELETE the list / have the token", async () => {
      const res = await supertest(server)
        .delete("/api/lists/1")
        .set("Authorization", `${token}`);

      expect(res.status).toBe(204);
    });
  });
});
