const express = require("express");
const router = express.Router();

const { momoController } = require("../controllers/index");
router.post("/create-payment", momoController.createPayment);

module.exports = router;
