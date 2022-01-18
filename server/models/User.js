const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userFirstName: {
        type: String,
        required: true
    },
    userMiddleName: {
        type: String
    },
    userLastName: {
        type: String,
        required: true
    },
    userGender: {
        type: String,
        required: true
    },
    userDoB: {
        type: String,
        required: true
    }
})

module.exports = User = mongoose.model('User', userSchema)