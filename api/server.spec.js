const request = require('supertest')

const server = require('./server.js') // Connects the File you are testing

describe('server.js', () => { // Creates an instances of the server to test
    describe('GET /api/auth', () => { // Sets up the test of the end points
        it('returns 200 OK', () => { // A Test to check the / 200 code response
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200) // checks res.status for the 200 code response 
                })
        })

        it('should return { api: up}', async () => { // An example of an async and 
            const res = await request(server).get('/'); // await function instead of using a return like the above
            expect(res.body).toEqual({ api: 'up' })
            expect(res.body.api).toBe('up')
        })

        // An example of using the done keyword to achieve the same type
        //of async and await or the return from the first one
        it('returns JSON', done => {
            request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                    done()
                })
        })

    })

})
