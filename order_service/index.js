const express = require('express');
const cors = require('cors');
const {Order, Catalog} = require('./models/Order');
const { connectKafka, listenEvents } = require('./events/orderEvents');
const { connectDB } = require('./config');
const orderRouter = require('./routes/orderRoutes')

require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

app.use('/orders', orderRouter);

const startServer = async () => {
    try{
        await connectDB();
        await Order.sync();
        await Catalog.sync();
        await listenEvents();
        await connectKafka();
    }catch(error){
        console.log(error);
    }
    
  
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  };

startServer().catch((err) => console.error('Error starting server:', err));

