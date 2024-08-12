const Cart = require("../models/cartModel");
const Product = require("../models/productModule")

exports.createCart = async (req, res) => {
    const { user_id } = req.user;
    const { product_id, quantity } = req.body;

    try {
        // Find the cart for the user
        let newCart = await Cart.findOne({ user_id });

        if (!newCart) {

             newCart = new Cart({
                user_id,
                Products: [
                    {
                        product_id,
                        quantity
                    }
                ]
            });
            await newCart.save();
            return res.status(201).json({ message: "Cart Created Successfully" });
        } else {

            const productIndex = newCart.Products.findIndex((prod) => prod.product_id === product_id);

            if (productIndex > -1) {

                newCart.Products[productIndex].quantity = quantity;
            } else {

                newCart.Products.push({ product_id, quantity });
            }
            await newCart.save();
            return res.status(200).json({ message: "Cart Updated Successfully" });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "An error occurred while processing the cart" });
    }
};

exports.getCart = async(req,res)=>{
        // Find the cart for the user
        const { user_id } = req.user;
        let cart = await Cart.findOne({ user_id });
        let subtotal=0;

        if(!cart){
           return res.status(404).json("Cart not found");
        }
        try{
        const CartItems = await Promise.all(
            cart.Products.map(async (product)=>{
                const productDetails = await Product.findOne({id:product.product_id});
                subtotal+=productDetails.price *  product.quantity;
                return{
                    product_id:productDetails.id,
                    title:productDetails.title,
                    description:productDetails.description,
                    price:productDetails.price,
                    image:productDetails.image,
                    quantity:productDetails.quantity,
                };
            })
        )
        res.status(200).json({CartItems:CartItems,subtotal});
    }
    catch(e){
        console.log(e)
        res.status(500)

    }
        return res.status(200).json(cart);
}

exports.deleteCart = async (req,res)=>{
    const {user_id} = req.user;
    try{
        const cart =await Cart.findOne({user_id});
        if(!cart){
            return res.status(404).json("cart not found")
        }
        let {productid} = req.params;
        const isproductValid = cart.Products.find((prod)=>productid===prod.product_id);

        if(!isproductValid){
            return res.status(404).json("no valid items exists");
        }

        console.log(productid);
        if(cart.Products.length<=1){
            await cart.deleteOne({user_id});
            return res.status(200).json({message:"cart deleted successfully"});
        }
        else{
        cart.Products = cart.Products.filter((prod)=> productid!=prod.product_id);
        await cart.save();
        return res.status(200).json({message:"cart deletesd successfully"});
        }
    }
    catch(e){
        console.log(e);
        res.status(500).json()
    }
}
