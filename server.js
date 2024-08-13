const express = require('express');
const cors= require('cors');
const app = express();
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes');

const mongoose = require("mongoose");

app.use(express.json())
app.use(cors());

mongoose.connect(
    "mongodb+srv://ganimaheshwari07:EcomGanesh@cluster0.2txvex6.mongodb.net/"
).then(()=>{
    console.log("connected to database");
}).catch((e)=>{
    console.log(e)
})

// mongoose.connect("mongodb://127.0.0.1/ecom-back").then(()=>{
//     console.log("connected to database");
// }).catch((e)=>{
//     console.log(e)
// })



app.use('/products',productRoutes);
app.use('/user',userRoutes);
app.use('/cart',cartRoutes);
app.use('/order',orderRoutes);



app.listen(5000,()=>{
    console.log("Server is running");
})
