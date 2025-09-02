const { ServiceBusClient } = require('@azure/service-bus');
require('dotenv').config();

// Create a Service Bus client
const serviceBusClient = new ServiceBusClient(process.env.connectionString);

// Variable to hold the receiver instance
let receiver;

// Array to store received messages
let receivedMessages = [];

// Function to handle incoming messages
async function handleMessage (message) {
  console.log(`Received message: ${message.body.toString}`);
  receivedMessages.push(message.body);
}

// Error handler
function handleError (err) {
  console.error('Error occurred:', err);
}

// Function to start receiving messages
function startReceivingMessages (topicName) {
  if (!receiver) {
    receiver = serviceBusClient.createReceiver(topicName, 'ffc-pay-automation', { receiveMode: 'receiveAndDelete' });
    receiver.subscribe({ processMessage: handleMessage, processError: handleError });
    console.log(`Listening for messages on subscription: ffc-pay-automation for topic: ${topicName}`);
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