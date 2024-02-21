const { ServiceBusClient } = require('@azure/service-bus');
require('dotenv').config();

async function sendMessageQueue (messageBody) {
  const serviceBusClient = new ServiceBusClient(process.env.connectionString);
  const messageSender = serviceBusClient.createSender(process.env.queueName);
  const message = {
    body: messageBody,
    label: 'Message from Cypress'
  };
  try {
    const batch = await messageSender.createMessageBatch();
    batch.tryAddMessage(message);
    await messageSender.sendMessages(batch);
    return 'Message sent successfully!';
  } catch (error) {
    return `Error sending message: ${error.message}`;
  } finally {
    await messageSender.close();
    await serviceBusClient.close();
  }
}

module.exports = {
  sendMessageQueue,
};