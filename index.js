const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const app = express()
const detectMocha = require('detect-mocha');


// import routes
const hotels = require('./routes/hotels')
const hotelContacts = require('./routes/hotelContacts')
const invoices = require('./routes/invoices')
const orders = require('./routes/orders')

// connect to the database
const {connectDatabase} = require("./config/db")
const mongoose = require("mongoose");

dotenv.config()

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;

const databaseName = detectMocha() ? process.env.MONGO_TEST_DATABASE : process.env.MONGO_DATABASE;

connectDatabase(mongoUsername, mongoPassword, databaseName)


while (mongoose.connection.closed) {
  console.log("xxx")
}

const port = process.env.PORT || 8080

const apiVersion = 'v1'

/**
 * MIDDLE WARE
 **/

// add cors middle ware
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.json());

/**
 * ROUTES
 */
app.use(`/api/${apiVersion}/hotels`, hotels)
app.use(`/api/${apiVersion}/hotel-contacts`, hotelContacts)
app.use(`/api/${apiVersion}/customers`, invoices)
app.use(`/api/${apiVersion}/orders`, orders)


app.listen(port, () => {
  console.log(`api running on port ${port}`)
})

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

module.exports = app
