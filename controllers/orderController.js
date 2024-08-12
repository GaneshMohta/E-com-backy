const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModule");
const { v4: uuidv4 } = require("uuid");

exports.createOrder = async (req, res) => {
  let { email, user_id } = req.user;
  const cart = await Cart.findOne({ user_id });
  console.log(cart.Products);
  const { name, address, PhoneNo } = req.body;
  try {
    if (!cart) {
      return res.status(400).json({ message: "No order exists" });
    } else {
      const order = new Order({
        id: uuidv4(),
        customer_id:user_id,
        name,
        address,
        PhoneNo,
        email,
        Products: cart.Products,
      });
      await order.save();
      res.status(200).json({ message: "Order successfull" });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Internal error" });
  }
};


exports.getOrder= async(req,res)=>{
    let {user_id} = req.user;
    const orders = await Order.findOne({ customer_id:user_id })
    try{
        if(!orders){
            return res.status(404).json({message:"No order exists"});
        }

        let subtotal=0
        const orderItems = await Promise.all(
          orders.Products.map(async (product)=>{
            const productDetails = await Product.findOne({id:product.product_id});
            subtotal+=productDetails.price *  product.quantity;
            return{
                product_id:productDetails.id,
                title:productDetails.title,
                price:productDetails.price,
                image:productDetails.image,
                quantity:productDetails.quantity,
            };
          })
        )
        res.status(200).json({orderItems:orderItems,subtotal})

    }
    catch(e){
      console.log(e);
      res.status(404).json({message:"Internal error"});
    }
    }
