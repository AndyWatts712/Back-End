const supertest = require('supertest')

const usersRouter = require('./users-router')
const db = require('../data/dbConfig')


//Shaun
describe('jokes-router', () => {
    //next batch of code is for storing token to use to access restricted
    let token;
    beforeEach((done) => {
        supertest(server)
            .post('/api/auth/login')
            .send(testUser)
            .end((err, response) => {
            token = response.body.token
            done();
            });
        });
    //STORE DONE


    describe('GET /api/jokes', () => {
        it('returns 401 without token', async () => {
            const res = await supertest(server)
                .get('/api/jokes')

            expect(res.status).toBe(401)
        })

        it('accesses the route with a token', async () => {
            const res = await supertest(server)
                .get('/api/jokes')
                .set('Authorization', `${token}`)

            expect(res.status).toBe(200)
            expect(res.type).toMatch(/json/i)
        })
    })
})