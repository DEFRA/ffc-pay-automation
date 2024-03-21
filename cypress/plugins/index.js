const cucumber = require('cypress-cucumber-preprocessor').default;
const { emptyFolder } = require('../utils/empty-folder');
const { sendMessageTopic } = require('../utils/sendMessageTopic');
const { sendMessageQueue } = require('../utils/sendMessageQueue');
const { startReceivingMessages, stopReceivingMessages, getReceivedMessages } = require('../utils/receiveMessage');

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());

  on('task', {
    emptyFolder: (folderPath) => emptyFolder(folderPath),
  });

  // on('task', {
  //   sendMessageTopic (messageBody) {
  //     return sendMessageTopic(messageBody);
  //   }
  // });

  // on('task', {
  //   sendMessageQueue (messageBody) {
  //     return sendMessageQueue(messageBody);
  //   }
  // });

  // on('task', {
  //   startMessageReception () {
  //     startReceivingMessages();
  //     return null;
  //   },
  //   stopMessageReception () {
  //     stopReceivingMessages();
  //     return null;
  //   },
  //   fetchReceivedMessages () {
  //     return getReceivedMessages();
  //   }
  // });

  console.log(on);
  console.log(config);
};