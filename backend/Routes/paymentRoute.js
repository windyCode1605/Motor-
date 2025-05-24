const express = require('express');
const router = express.Router();
const momoController = require('../controllers/paymentController');

router.post('/gi', momoController.createMoMoPayment);
router.post('/momo-ipn', momoController.handleMomoIPN);

module.exports = router;
