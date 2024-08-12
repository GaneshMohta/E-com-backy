const cartController = require('../controllers/cartController')
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

router.post('/',auth,cartController.createCart);
router.get('/',auth,cartController.getCart);
router.delete('/:productid',auth,cartController.deleteCart)
module.exports = router;
