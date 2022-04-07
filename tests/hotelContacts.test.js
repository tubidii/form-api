const expect = require('chai').expect
const request = require('supertest');
const {describe, it} = require("mocha");

const testSetup = require('./helpers/testSetup')
const app = require('../index');
const HotelContact = require('../models/HotelContact');


testSetup()

describe('GET: /api/v1/hotel-contacts fetch all hotel-contacts', async () => {

  it('fetches all hotel-contacts', async () => {
    await HotelContact.create({
      name: 'Test HotelContact',
      location: {
        longitude: 0.3224242,
        latitude: 0.4242131
      }
    })
    return request(app).get('/api/v1/hotel-contacts').expect(200).then(
      (response) => {
        const body = JSON.parse(response.text)
        console.log(body)
      }
    );
  });
})

describe('POST: /api/v1/hotel-contacts create a hotel-contact', async () => {
  it('creates a hotel-contact', async () => {
    request(app).post('/api/v1/hotel-contacts')
      .send({
        name: 'Test HotelContact',
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

describe('GET: /api/v1/hotel-contacts/:id fetch a specific hotel-contact', async () => {

  it('get a hotel-contact', async () => {
    const createdHotelContact = await HotelContact.create({
      name: 'Test HotelContact',
      location: {
        longitude: 0.3224242,
        latitude: 0.4242131
      }
    })
    return request(app).get(`/api/v1/hotel-contacts/${createdHotelContact._id}`).expect(200).then(
      (response) => {
        const body = JSON.parse(response.text)
        //console.log(body)
      }
    );
  });
})

describe('PUT: /api/v1/hotel-contacts/:id updates a specific hotel-contact', async () => {
  it('updates a hotel-contact', (done) => {
    HotelContact.create({
      name: 'Test HotelContact',
      location: {
        longitude: 0.3224242,
        latitude: 0.4242131
      }
    }).then(
      (createdHotelContact) => {
        request(app).put(`/api/v1/hotel-contacts/${createdHotelContact._id}`)
          .expect(200)
          .send({
            name: 'Test HotelContact Update',
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

describe('DELETE: /api/v1/hotel-contacts/:id deletes a hotel-contact', async () => {

  it('fetches a hotel-contacts', async () => {
    await HotelContact.create({
      name: 'Test HotelContact',
      location: {
        longitude: 0.3224242,
        latitude: 0.4242131
      }
    })
    await request(app).get('/api/v1/hotel-contacts').expect(200).then(
      (response) => {
        const body = JSON.parse(response.text)
        //console.log(body)
      }
    );
  });
})
