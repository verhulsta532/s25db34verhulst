const mongoose = require("mongoose")
const dogSchema = mongoose.Schema({
    dog_name: String,
    breed: String,
    age: Number
})

MediaSourceHandle.exports = mongoose.model("Dog", dogSchema)