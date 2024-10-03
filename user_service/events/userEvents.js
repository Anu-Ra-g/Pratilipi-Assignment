const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'user-service',
    brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

const connectKafka = async () => {
    await producer.connect();
    console.log('Kafka connected');
};

const publishEvent = async (event, data) => {
    try {
        await producer.send({
            topic: event,
            messages: [
                { value: JSON.stringify(data) },
            ],
        });
        console.log(`Event published: ${event}`, data);
    } catch (error) {
        console.error('Error publishing event:', error);
    }
};

module.exports = { connectKafka, publishEvent };
