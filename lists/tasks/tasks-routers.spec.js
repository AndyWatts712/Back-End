const supertest = require('supertest')

const server = require('../../api/server')
const db = require('../../database/dbConfig')

const testLogin = {
    username: "testuser1234",
    password: "testing123",
  };
const testList = {
    name: "Test List",
    type: "1"
};
const testTask = {
    name: "Test List",
    type: "1"
};


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
    beforeAll((done) => {
        supertest(server)
            .post('/api/lists')
            .send(testList)
            .set("Authorization", `${token}`)
    });

    describe('GET /api/tasks', () => {
        it.skip('returns 401 without token', async () => {
            const res = await supertest(server)
                .get('/api/lists/1/tasks')

            expect(res.status).toBe(401)
        })

        it('accesses the route with a token', () => {
            return supertest(server)
                .get('/api/lists/1/tasks')
                .set('Authorization', `${token}`)
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.type).toMatch(/json/i)        
                })
        })
    })
})