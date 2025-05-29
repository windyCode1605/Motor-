const express = require('express');
const router = express.Router();
const receptionistController = require('../controllers/receptionistController');



router.get('/receptionist', receptionistController.getReceptionists);



router.post('/receptionist', receptionistController.createReceptionist);


router.put('/receptionist/:id', receptionistController.updateReceptionist);


router.delete('/receptionist/:id', receptionistController.deleteReceptionist);

module.exports = router;