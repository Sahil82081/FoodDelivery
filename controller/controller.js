const { ObjectId } = require('mongodb')
const db = require('../Database/db')
const jwt = require('jsonwebtoken')



const resgistration = async (req, res) => {
    try {
        let user = req.body
        const userexist = await db.userdata.findOne({
            email: req.body.email
        })
        if (userexist) {
            return res.status(401).json({
                message: "User is Already existed"
            })
        }
        saveduser = await db.userdata(user).save()
        console.log("User Saved Successfully")
        const token = jwt.sign({ id: saveduser._id }, process.env.SECRET_KEY)
        res.json({
            message: "Succesfully Register",
            token
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: error
        })
    }

}

const login = async (req, res) => {
    try {
        const user = req.body
        const userexist = await db.userdata.findOne({ email: req.body.email })

        if (userexist.email == user.email && userexist.password == user.password) {
            const token = jwt.sign({ id: userexist._id }, process.env.SECRET_KEY)
            res.json({
                message: "Successfully Login",
                token,
                user: userexist
            })
        }
        else {
            res.json({
                message: "Email Or Password does not match "
            })
        }

    } catch (error) {
        console.log(error)
    }

}

const shopregistration = async (req, res) => {

    try {
        let hotel = req.body
        hoteldata = await db.hoteldata(hotel).save()
        console.log("Hotel Data Submited")
        res.json({
            message: "Succesfully Submitted",
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: error
        })
    }

}

const shoplogin = async (req, res) => {

    const hotel = req.body
    const hotelexist = await db.hoteldata.findOne({ email: hotel.email })
    console.log(hotelexist)

    if (hotelexist.email == hotel.email && hotelexist.password == hotel.password) {

        if (hotelexist.verified) {
            return res.json({
                message: "Your Form is Under Verification"
            })
        }
        const token = jwt.sign({ id: hotelexist._id }, process.env.SECRET_KEY)
        res.json({
            message: "Successfully Login",
            token
        })
    }
    else {
        res.json({
            message: "Email Or Password does not match "
        })
    }
}

const shopsinfo = async (req, res) => {

    const shops = await db.hoteldata.find()
    res.json({
        message: "Success",
        shops
    })
}

const shopdetail = async (req, res) => {

    try {
        const id = req.params.id
        const hotel = await db.hoteldata.findById(id)
        res.json({
            message: "Success",
            hotel
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: Error,
        })

    }
}

const getOrders = async (req, res) => {
    try {
        const user = req.user
        const userdata = await db.userdata.findOne({ _id: user.id }).populate("ordered")
        console.log(userdata)
        res.status(200).json({
            orderd: userdata.ordered
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}

const getuserdata = async (req, res) => {
    try {
        const user = req.user
        const userdata = await db.userdata.findById({ _id: user.id })
        console.log(userdata)
        res.status(201).json({
            userdata
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

const hotelhomepage = async (req, res) => {
    const hotel = req.user
    const hoteldetail = await db.hoteldata.findOne({ _id: hotel.id })

    res.status(201).json({
        message: "Success",
        hoteldetail
    })

}

const hoteldishadd = async (req, res) => {
    const hotel = req.user
    try {
        await db.hoteldata.findByIdAndUpdate({ _id: hotel.id }, {
            $push: {
                dishes: req.body
            }
        })
        console.log("Firse ADD Hogaya")
        res.status(200).json({
            message: "Succesfully added"
        })
    } catch (error) {
        console.log(error)
        res.status(501).json({
            message: "Internal Server Error"
        })
    }
}

const removedish = async (req, res) => {
    try {
        const hotel = req.user
        const id = req.params.id
        await db.hoteldata.updateOne({ _id: hotel.id }, { $pull: { dishes: { _id: id } } })
        console.log("successfully")
    } catch (err) {
        console.log(err)
    }
}

const editdish = async (req, res) => {
    try {
        const id = req.params.id
        const hotel = req.user
        const dish = req.body
        const hoteldetail = await db.hoteldata.findOne({ _id: hotel.id })
        const dishes = hoteldetail.dishes.map((item) =>
            item._id == id ? dish : item
        )
        await db.hoteldata.findOneAndUpdate({ _id: hotel.id }, { dishes: dishes })
        console.log("Successfull Updated")

        res.status(200).json({
            message: "Successfully Submitted"
        })
    } catch (error) {
        console.log(error)
    }
}

const hotelorders = async (req, res) => {
    try {
        const user = req.user
        const hotel = await db.ordereddata.find({ hotelid: user.id })
        res.status(200).json({
            hotel
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}
const orderstatus = async (req, res) => {
    try {
        const orderid = req.body.orderid
        const Status = req.body.status
        await db.ordereddata.findByIdAndUpdate({ _id: orderid }, { Status })
        const updatedOrder = await db.userdata.findOneAndUpdate(
            { 'ordered': { _id: orderid } },
            { $set: { 'ordered.$.Status': 'confirm' } }
        );
        res.status(200).json({
            message: `Order ${Status}`
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}

const addresssaved = async (req, res) => {
    try {
        const user = req.user
        const newaddress = req.body
        console.log(newaddress)
        const userdata = await db.userdata.findByIdAndUpdate({ _id: user.id }, {
            $push: {
                address: newaddress
            }
        })
        console.log("Address Saved")
        res.status(201).json({
            message: "Address Saved"
        })
    } catch (error) {
        console.log(error)
        res.status(501).json({
            Error: error
        })
    }
}

const placeorder = async (req, res) => {
    const user = req.user
    const userdata = await db.userdata.findById({ _id: user.id })
    if (userdata.address.lendth == 0) {
        return res.status(404).json({
            message: "Address Not Saved"
        })
    } else {
        res.status(201).json({
            message: "Address Found"
        })
    }
}
const useraddress = async (req, res) => {
    try {
        const user = req.user
        const userdata = await db.userdata.findById({ _id: user.id })
        res.status(201).json({
            message: "User Address",
            address: userdata.address
        })
    } catch (error) {
        res.status(500).json({
            Error: error
        })
        console.log(error)
    }
}
const ordersummary = async (req, res) => {
    try {
        const user = req.user
        const addressid = req.body.useraddress
        const hotelid = req.body.hotelid
        const hotel = await db.hoteldata.findById({ _id: hotelid }).select("-dishes -openingtime -closingtime -password -description -email -Verified")
        const userdata = await db.userdata.findOne({ _id: user.id, "address._id": addressid }, { "address.$": 1 })
        const specificaddress = userdata.address[0]
        res.status(201).json({
            message: "Address Recived",
            hotel,
            specificaddress
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            Error: error
        })
    }
}


const orderplaced = async (req, res) => {
    try {
        const user = req.user
        const orderedinfo = req.body
        const order = await db.ordereddata(orderedinfo).save()
        console.log(order)
        await db.userdata.findByIdAndUpdate({ _id: user.id }, {
            $push: {
                ordered: order._id
            }
        })
        console.log("Order Placed")
        res.status(201).json({
            message: "Order Placed"
        })
    } catch (error) {
        res.status(500).json({
            Error: error
        })
    }
}

module.exports = {
    resgistration, login, shopregistration, shoplogin, shopsinfo,
    shopdetail, getOrders, hotelhomepage, hoteldishadd, removedish, editdish, placeorder,
    addresssaved, useraddress, ordersummary, orderplaced, hotelorders, orderstatus, getuserdata
}
