const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth')

router.post('/',auth,orderController.createOrder);
router.get('/',auth,orderController.getOrder);

module.exports = router;
