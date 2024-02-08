const { ServiceBusClient } = require('@azure/service-bus');

// Connection string for your Azure Service Bus namespace
const connectionString = 'Endpoint=sb://sndffcinfsb1001.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=XAs4qFZfUzO1aURxztvK/q7nTxx74yNQB+ASbFzFhhg=';

// Name of the topic and subscription
const topicName = 'ffc-pay-processing-kj';
const subscriptionName = 'ffc-pay-processing-kj';

// Create a Service Bus client
const serviceBusClient = new ServiceBusClient(connectionString);

// Create a receiver for the specified subscription
const receiver = serviceBusClient.createReceiver(topicName, subscriptionName);

let receivedMessages = [];

async function handleMessage (message) {
  console.log(`Received message: ${message.body}`);
  receivedMessages.push(message.body);
  await message.complete();
}

function handleError (err) {
  console.error('Error occurred:', err);
}

function startReceivingMessages () {
  receiver.subscribe({ processMessage: handleMessage, processError: handleError });
  console.log(`Listening for messages on subscription: ${subscriptionName}`);
}

function getReceivedMessages () {
  const messages = [...receivedMessages];
  receivedMessages = []; // Clear after fetching
  return messages;
}

module.exports = {
  startReceivingMessages,
  getReceivedMessages,
};