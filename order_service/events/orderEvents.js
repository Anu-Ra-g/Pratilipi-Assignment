const { Kafka } = require('kafkajs');
const { Catalog } = require('../models/Order')

const kafka = new Kafka({
  clientId: 'order-service',
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'order-service-group' });

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
  await consumer.subscribe({ topics: ['product-created', 'inventory-updated'], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, _, message }) => {
      const data = JSON.parse(message.value.toString());
      // adds a product to the catalog

      try{
        if (topic === 'product-created') {
        
          if (data.inventory > 0) {
            await Catalog.create({
              productid: data.id,
              name: data.name,
              price: data.price,
            })
          }
        }
  
        // updates the catalog based on the value in product
        if (topic === 'inventory-updated') {
          
          const oldProduct = await Catalog.findOne({ where: { productid: data.id } })
          await oldProduct.update(data)
        }
        console.log(`Received event: `, topic);
      }catch(error){
        console.log("Error occur");
        
      }
      
    },
  });
};

module.exports = { connectKafka, publishEvents, listenEvents };
