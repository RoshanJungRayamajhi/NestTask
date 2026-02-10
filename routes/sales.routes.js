const express = require("express")
const { addSales } = require("../controller/sales.controller")
const router = express.Router()

router.post("/add",addSales)



module.exports = router