const mongoose = require("mongoose")

const connectDatabase = (username, password, databaseName) => {
  mongoose.connect(
    `mongodb+srv://${username}:${password}@cluster0.0qe4e.mongodb.net/${databaseName}?retryWrites=true&w=majority`,
  ).then(
    () => {
      console.log("mongo db connected")
    }
  )
  setTimeout(() => console.log('database load complete database'), 3000)
}

module.exports = {
  connectDatabase
}
