const { ServiceBusClient } = require('@azure/service-bus');

const connectionString = 'Endpoint=sb://sndffcinfsb1001.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=XAs4qFZfUzO1aURxztvK/q7nTxx74yNQB+ASbFzFhhg=';
const topicName = 'ffc-pay-processing-kj';

async function sendMessageTopic (messageBody) {
  const serviceBusClient = new ServiceBusClient(connectionString);
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
  sendMessageTopic,
};