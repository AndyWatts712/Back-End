//Natalia
const supertest = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

//--tests--//
describe("server", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("GET /", () => {
    it("should return 200 OK", () => {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

  it("should return 200 in the Jest", () => {
    return supertest(server).get("/").expect(200);
  });

  // using supertest's .expect()
  it("Should return api: started", () => {
    return supertest(server).get("/").expect({ api: "started" });
  });

  // using jest's expect()
  it("Should return an api property with the value of -> started", () => {
    return supertest(server)
      .get("/")
      .then((res) => {
        expect(res.body.api).toBe("started");
      });
  });
});
