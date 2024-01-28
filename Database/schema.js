const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const address = {
  fullname: String,
  phone: Number,
  email: String,
  gender: String,
  landmark: String,
  city: String,
  state: String,
  country: String,
  address: String
}



const dishschema = {
  dishname: String,
  price: String,
  description: String
}
const hotelschema = {
  Verified: {
    type: Boolean,
    default: false
  },
  hotelname: String,
  ownername: String,
  openingtime: String,
  closingtime: String,
  email: String,
  password: String,
  contact: Number,
  city: String,
  address: String,
  description: String,
  dishes: {
    type: [dishschema]
  }
}
const RejectedHotel = {
  Verified: {
    type: String,
    default:"Rejected"
  },
  hotelname: String,
  ownername: String,
  openingtime: String,
  closingtime: String,
  email: String,
  password: String,
  contact: Number,
  city: String,
  address: String,
  description: String,
  dishes: {
    type: [dishschema]
  }
}



const orderschema = new mongoose.Schema({
  Status: {
    type: String,
    default: "Pending"
  },
  hotelid: String,
  ordered: [
    {
      dish: [
        {
          dishname: String,
          price: String,
          description: String,
          _id: String,
          quantity: Number
        }
      ],
      clientaddress: {
        fullname: String,
        phone: Number,
        email: String,
        gender: String,
        landmark: String,
        city: String,
        state: String,
        country: String,
        address: String,
        _id: String
      },
      hoteladdress: {
        _id: String,
        hotelname: String,
        ownername: String,
        contact: Number,
        city: String,
        address: String,
      },
      ordertime: {
        time: String,
        date: String
      },
      totalamt: Number
    }
  ]
})



const userschema = {
  isadmin: {
    type: Boolean,
    default: false
  },
  firstname: String,
  lastname: String,
  email: String,
  dob: String,
  password: String,
  contact: Number,
  gender: String,
  address: {
    type: [address],
  },
  ordered: [{
    type: ObjectId,
    ref: "ordereddata"
  }],
  token: String
}

module.exports = { userschema, hotelschema, orderschema ,RejectedHotel}