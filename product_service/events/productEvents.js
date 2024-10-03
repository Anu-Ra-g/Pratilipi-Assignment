const { Kafka } = require('kafkajs');
const { Product } = require('../models/Product')

const kafka = new Kafka({
  clientId: 'product-service',
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'product-service-group' });

const connectKafka = async () => {
  await producer.connect();
  await consumer.connect();
  console.log('Kafka connected');
};

const publishEvents = async (event, data) => {
  try {
    await producer.send({
      topic: event,
      messages: [
        { value: JSON.stringify(data) },
      ],
    });
    console.log(`Event published: ${event}`);
  } catch (error) {
    console.error('Error publishing event:', error);
  }
};

const listenEvents = async () => {
  await consumer.subscribe({ topic: 'order-placed', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, _, message }) => {
      const data = JSON.parse(message.value.toString());

      try {
        if (topic === "order-placed") {
          const product_found = await Product.findByPk(data.productid)

          if (product_found.inventory > 0) {
            product_found.inventory -= data.quantity;
          }
          await product_found.save();

        }
      } catch (error) {
        // to catch the error if the quantity is more than inventory but the order will be placed in order service
        // not handled that case 
        console.log("Error: Quantity of order placed is more than inventory");
        

      }

    },
  });
};

module.exports = { connectKafka, publishEvents, listenEvents };
