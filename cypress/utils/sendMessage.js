const { ServiceBusClient } = require('@azure/service-bus');
require('dotenv').config();

async function sendMessage ({ messageBody, topicName }) {
  const serviceBusClient = new ServiceBusClient(process.env.connectionString);
  const messageSender = serviceBusClient.createSender(topicName);
  const message = {
    body: messageBody
  };
  try {
    await messageSender.sendMessages(message);
    return 'Message sent successfully!';
  } catch (error) {
    return `Error sending message: ${error.message}`;
  } finally {
    await messageSender.close();
    await serviceBusClient.close();
  }
}

module.exports = {
  sendMessage,
};