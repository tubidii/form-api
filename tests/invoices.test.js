const expect = require('chai').expect
const request = require('supertest');
const {describe, it} = require("mocha");

const testSetup = require('./helpers/testSetup')
const app = require('../index');
const Hotel = require('../models/Hotel');


testSetup()

describe('GET: /api/v1/hotels fetch all hotels', async () => {

  it('fetches all hotels', async () => {
    await Hotel.create({
      name: 'Test Hotel',
      location: {
        longitude: 0.3224242,
        latitude: 0.4242131
      }
    })
    return request(app).get('/api/v1/hotels').expect(200).then(
      (response) => {
        const body = JSON.parse(response.text)
        console.log(body)
      }
    );
  });
})

describe('POST: /api/v1/hotels create a hotel', async () => {
  it('creates a hotel', async () => {
    request(app).post('/api/v1/hotels')
      .send({
        name: 'Test Hotel',
        location: {
          latitude: 0.8123138,
          longitude: 43.0993209
        }
      })
      .then((res) => {
        expect(res.statusCode).to.equal(200)
        expect(res.body).to.be.an('object')
        //console.log(res.body)
        done()
      })
      .catch((err) => done(err))
  });
})

describe('GET: /api/v1/hotels/:id fetch a specific hotel', async () => {

  it('get a hotel', async () => {
    const createdHotel = await Hotel.create({
      name: 'Test Hotel',
      location: {
        longitude: 0.3224242,
        latitude: 0.4242131
      }
    })
    return request(app).get(`/api/v1/hotels/${createdHotel._id}`).expect(200).then(
      (response) => {
        const body = JSON.parse(response.text)
        //console.log(body)
      }
    );
  });
})

describe('PUT: /api/v1/hotels/:id updates a specific hotel', async () => {
  it('updates a hotel', (done) => {
    Hotel.create({
      name: 'Test Hotel',
      location: {
        longitude: 0.3224242,
        latitude: 0.4242131
      }
    }).then(
      (createdHotel) => {
        request(app).put(`/api/v1/hotels/${createdHotel._id}`)
          .expect(200)
          .send({
            name: 'Test Hotel Update',
            location: {
              latitude: 0.8123138,
              longitude: 43.0993209
            }
          })
          .then((res) => {
            expect(res.statusCode).to.equal(200)
            expect(res.body).to.be.an('object')
            done()
          })

      }
    )
  });
})

describe('DELETE: /api/v1/hotels/:id deletes a hotel', async () => {

  it('fetches a hotels', async () => {
    await Hotel.create({
      name: 'Test Hotel',
      location: {
        longitude: 0.3224242,
        latitude: 0.4242131
      }
    })
    await request(app).get('/api/v1/hotels').expect(200).then(
      (response) => {
        const body = JSON.parse(response.text)
        //console.log(body)
      }
    );
  });
})
