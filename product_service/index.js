const express = require('express');
const { connectDB } = require('./config');
const productRoutes = require('./routes/productRoutes');
const { Product } = require("./models/Product")

const { connectKafka, listenEvents } = require('./events/productEvents');

const app = express();
app.use(express.json());

app.use('/products', productRoutes);

const startServer = async () => {

  try {
    await connectDB();
    await Product.sync();
    await connectKafka();
    await listenEvents();
  } catch (error) {
    console.log(error);
  }

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer().catch((err) => console.error('Error starting server:', err));
