const mongoose = require('mongoose')
require('dotenv').config()
const { userschema, hotelschema, orderschema ,RejectedHotel} = require('./schema')

mongoose.connect(process.env.DATABASE_LINK).then(() => {
    console.log("Connected To DataBase")
})

const userdata = mongoose.model('userdata', userschema)
const hoteldata = mongoose.model('hoteldata', hotelschema)
const ordereddata = mongoose.model('ordereddata', orderschema)
const rejectedhotels = mongoose.model('rejectedhotels', RejectedHotel)

module.exports = { userdata, hoteldata, ordereddata ,rejectedhotels}