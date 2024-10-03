const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const { connectKafka } = require('./events/userEvents');
const { connectDB } = require('./config');
const userRouter = require('./routes/userRoutes')
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', userRouter);

const startServer = async () => {
    try{
        await connectDB();
        await User.sync();
        await connectKafka();
    }catch(error){
        console.log(error);
    }
    
  
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  };

startServer().catch((err) => console.error('Error starting server:', err));
