const Product = require("../models/productModule");
const { v4 : uuidv4 } = require('uuid');



exports.getProducts = async ( req,res)=>{
    try{
        const products = await Product.find();
        res.send(products);
    }
    catch (e){
        console.log(e);
    }
}

exports.createProducts = async (req, res)=>{
    try{
    const {title,description,price,category,rating,image} = req.body;
    const product = new Product({
        id : uuidv4(),
        title,
        price,
        description,
        category,
        rating,
        image
    })
    await product.save();
    res.status(200).json("Product created Sucessfully")
}
catch (e){
    res.status(400).json(e);
}
}

exports.deleteProducts = async (req , res)=>{
    try{
        const id = req.params;
    }
    catch(e){

    }
}
