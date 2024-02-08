const { ServiceBusClient } = require('@azure/service-bus');

const connectionString = 'Endpoint=sb://sndffcinfsb1001.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=XAs4qFZfUzO1aURxztvK/q7nTxx74yNQB+ASbFzFhhg=';
const queueName = 'ffc-pay-data-request-response-kj';

async function sendMessageQueue (messageBody) {
  const serviceBusClient = new ServiceBusClient(connectionString);
  const messageSender = serviceBusClient.createSender(queueName);
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