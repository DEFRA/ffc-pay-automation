const { ServiceBusClient } = require('@azure/service-bus');

const connectionString = 'Endpoint=sb://sndffcinfsb1001.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=XAs4qFZfUzO1aURxztvK/q7nTxx74yNQB+ASbFzFhhg=';
const queueName = 'ffc-pay-data-request-response-kj';

async function sendMessage ()   {
  const serviceBusClient = new ServiceBusClient(connectionString);
  const messageSender = serviceBusClient.createSender(queueName);
  const messageBody = 'I am Kiran and sent message through JavaScript!';
  const message = {
    body: messageBody,
    label: 'First message from JavaScript',
  };
  try {
    const batch = await messageSender.createMessageBatch(message);
    batch.tryAddMessage(message);
    messageSender.sendMessages(batch);
    console.log('Kiran, Your message sent successfully!');
  } finally {
    await messageSender.close();
    await serviceBusClient.close();
  }
}
sendMessage();