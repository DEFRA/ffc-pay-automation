const { ServiceBusClient } = require('@azure/service-bus');

// Connection string for your Azure Service Bus namespace
const connectionString = 'Endpoint=sb://sndffcinfsb1001.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=XAs4qFZfUzO1aURxztvK/q7nTxx74yNQB+ASbFzFhhg=';

// Name of the topic and subscription
const topicName = 'ffc-pay-processing-kj';
const subscriptionName = 'ffc-pay-processing-kj';

// Create a Service Bus client
const serviceBusClient = new ServiceBusClient(connectionString);

// Variable to hold the receiver instance
let receiver;

// Array to store received messages
let receivedMessages = [];

// Function to handle incoming messages
async function handleMessage (message) {
  console.log(`Received message: ${message.body}`);
  receivedMessages.push(message.body);
  await message.complete();
}

// Error handler
function handleError (err) {
  console.error('Error occurred:', err);
}

// Function to start receiving messages
function startReceivingMessages () {
  if (!receiver) {
    receiver = serviceBusClient.createReceiver(topicName, subscriptionName);
    receiver.subscribe({ processMessage: handleMessage, processError: handleError });
    console.log(`Listening for messages on subscription: ${subscriptionName}`);
  } else {
    console.log('Receiver is already started.');
  }
}

// Function to stop receiving messages
async function stopReceivingMessages () {
  if (receiver) {
    await receiver.close();
    receiver = null;  // Reset the receiver variable
    console.log('Receiver has been stopped');
  }
}

// Function to fetch and clear the received messages
function getReceivedMessages () {
  const messages = [...receivedMessages];
  receivedMessages = []; // Clear the array after fetching
  return messages;
}

module.exports = {
  startReceivingMessages,
  stopReceivingMessages,
  getReceivedMessages,
};