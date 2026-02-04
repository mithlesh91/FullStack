const mongoose = require('mongoose')

function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Db is connect");

        })
}

module.exports = connectDB