const express = require('express')
const Controllers = require('../controller/controller')
const AdminController = require('../controller/admincontroller')
const { hotelauth } = require('../middleware/hotelauth')
const { adminauth } = require('../middleware/adminauth')
const router = express.Router()


router.post('/api/register', Controllers.resgistration)
router.post('/api/login', Controllers.login)
router.post('/api/shopregistration', Controllers.shopregistration)
router.post('/api/shoplogin', Controllers.shoplogin)
router.get('/api/shops', Controllers.shopsinfo)
router.get('/api/shop/:id', Controllers.shopdetail)
router.get('/api/orders', hotelauth, Controllers.getOrders)
router.get('/api/user/profile', hotelauth, Controllers.getuserdata)
router.post('/api/hotel', hotelauth, Controllers.hotelhomepage)
router.post('/api/dishadd', hotelauth, Controllers.hoteldishadd)
router.get('/api/hotel/orders', hotelauth, Controllers.hotelorders)
router.post('/api/hotel/orders/status', hotelauth, Controllers.orderstatus)
router.post('/api/hotel/removedish/:id', hotelauth, Controllers.removedish)
router.post('/api/hotel/editdish/:id', hotelauth, Controllers.editdish)
router.post('/api/address', hotelauth, Controllers.addresssaved)
router.get('/api/useraddress', hotelauth, Controllers.useraddress)
router.post('/api/placeorder', hotelauth, Controllers.placeorder)
router.post('/api/orderdata', hotelauth, Controllers.ordersummary)
router.post('/api/orderplaced', hotelauth, Controllers.orderplaced)



//                             ADMIN ROUTES


router.post("/api/adminlogin", AdminController.adminlogin)
router.get("/api/admin/getalldata", adminauth, AdminController.getalldata)
router.get("/api/admin/userdetail/:id", adminauth, AdminController.getuserinfo)
router.put("/api/admin/verifyhotel/:id", adminauth, AdminController.verifyhotel)
router.put("/api/admin/rejecthotel/:id", adminauth, AdminController.Rejecthotel)

module.exports = router