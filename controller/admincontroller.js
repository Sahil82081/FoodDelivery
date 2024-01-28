const db = require('../Database/db.js')
const jwt = require('jsonwebtoken')

const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email.lenght == 0 || password.lenght == 0) {
            return res.status(404).json({
                error: true,
                msg: "Add all field"
            })
        }
        const userdata = await db.userdata.findOne({ email })
        if (!userdata) {
            return res.json({
                error: true,
                msg: "User Does not Exist"
            })
        }
        if (userdata.isadmin != true) {
            return res.status(401).json({
                error: true,
                msg: "User is not Admin"
            })
        }
        if (userdata.password == password) {
            const token = jwt.sign({ id: userdata._id }, process.env.SECRET_KEY)
            res.status(201).json({
                msg: "Login Successfull",
                token,
                AdminInlogged: true,
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            error
        })
    }
}

const getalldata = async (req, res) => {
    try {
        const Users = await db.userdata.find()
        const Hotel = await db.hoteldata.find()
        const orders = await db.ordereddata.find()
        res.status(201).json({
            Users, Hotel, orders
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getuserinfo = async (req, res) => {
    try {
        const userid = req.params.id
        const user = await db.userdata.findById(userid).populate('ordered')
        res.status(201).json({
            user
        })

    } catch (error) {
        res.status(500).json({
            error
        })
        console.log(error)
    }
}

const verifyhotel = async (req, res) => {
    try {
        const hotelid = req.params.id
        await db.hoteldata.findByIdAndUpdate({ _id: hotelid }, { Verified: true })
        res.status(201).json({
            msg:"Accepted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

const Rejecthotel = async (req, res) => {
    try {
        const hotelid = req.params.id
        const hotel = await db.hoteldata.findByIdAndDelete(hotelid)
        const rejected = {hotelid:hotel._id,Verified:"Rejected"}
        const rejectedHotel = new db.rejectedhotels(rejected); // Creating a new rejected hotel document
        await rejectedHotel.save();
        res.status(201).json({
            meg:"Rejected Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(501).json({
            error
        })
    }
}
module.exports = { adminlogin, getalldata, getuserinfo, verifyhotel, Rejecthotel }