const supertest = require('supertest')

const server = require('../../api/server')
const db = require('../../database/dbConfig')

const testLogin = {
    username: "testuser1234",
    password: "testing123",
  };
const testTask = {
    name: "Test Task",
    complete_by:"2020-08-26"
};
const updateTask = {
    name: "Task Update"
}


//next batch of code is for storing token to use to access restricted
let token;
beforeAll((done) => {
    supertest(server)
        .post('/api/auth/login')
        .send(testLogin)
        .end((err, response) => {
        token = response.body.token
        done();
        });
    });
//STORE DONE

//Shaun
describe('tasks-router', () => {

describe('GET /api/lists/1/tasks', () => {
    it('returns 401 without token', async () => {
        const res = await supertest(server)
            .get('/api/lists/1/tasks')

        expect(res.status).toBe(401)
    })

    it('accesses the route with a token', async () => {
        const res = await supertest(server)
            .get('/api/lists/1/tasks')
            .set('Authorization', `${token}`)

            const tests = await db('lists')
            console.log(tests)

            expect(res.status).toBe(200)
            expect(res.type).toMatch(/json/i)        
            
    })
})
describe('POST /api/lists/1/tasks', () => {
    beforeEach(async () => {
        await db("items").truncate();
        });
    it('returns 401 without token', async () => {
        const res = await supertest(server)
            .post('/api/lists/1/tasks')

        expect(res.status).toBe(401)
    })

    it('accesses the route with a token', async () => {
        const res = await supertest(server)
            .post('/api/lists/1/tasks')
            .send(testTask)
            .set('Authorization', `${token}`)

            const tests = await db('items')

            expect(res.status).toBe(200)
            expect(res.type).toMatch(/json/i)
            expect(tests).toHaveLength(1)        
            
    })
})
describe("GET /api/lists/1/tasks/:id", () => {
    it("returns 401 without token", async () => {
      const res = await supertest(server).get("/api/lists/1/tasks/1");

      expect(res.status).toBe(401);
    });

    it("accesses the route with a token", async () => {
      const res = await supertest(server)
        .get("/api/lists/1/tasks/1")
        .set("Authorization", `${token}`);

      expect(res.status).toBe(200);
    });

    it("returns information", async () => {
        const res = await supertest(server)
          .get("/api/lists/1/tasks/1")
          .set("Authorization", `${token}`);
  
        expect(res.body).toHaveProperty('data');
    });

  });
describe("PUT /api/lists/1/tasks/:id", () => {
    it("returns 401 without token", async () => {
      const res = await supertest(server)
        .put("/api/lists/1/tasks/1")
        .send(updateTask);

      expect(res.status).toBe(401);
    });

    it("accesses the route with a token", async () => {
      const res = await supertest(server)
        .put("/api/lists/1/tasks/1")
        .send(updateTask)
        .set("Authorization", `${token}`);

      expect(res.status).toBe(200);
    });

    it("returns information", async () => {
        const res = await supertest(server)
          .put("/api/lists/1/tasks/1")
          .send(updateTask)
          .set("Authorization", `${token}`);
  
        expect(res.body).toHaveProperty('data');
    });

});
describe("DELETE /api/lists/1/tasks/:id", () => {
it("returns 401 without token", async () => {
    const res = await supertest(server)
    .delete("/api/lists/1/tasks/1")

    expect(res.status).toBe(401);
});

it("accesses the route with a token", async () => {
    const res = await supertest(server)
    .delete("/api/lists/1/tasks/1")
    .set("Authorization", `${token}`);

    expect(res.status).toBe(204);
});
});
})