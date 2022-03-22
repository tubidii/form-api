const mongoose = require('mongoose');
const {after} = require("mocha");


const testSetup = () => {
  after(
    async () => {
      const collections = await mongoose.connection.db.collections()
      await collections.forEach(
        (collection) => {
          try {
            collection.deleteMany({})
          } catch (e) {

          }
        }
      )
    }
  )
}

module.exports = testSetup;
