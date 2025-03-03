const cucumber = require('cypress-cucumber-preprocessor').default;
const { emptyFolder } = require('../utils/empty-folder');
const { sendMessage } = require('../utils/sendMessage');
const { startReceivingMessages, stopReceivingMessages, getReceivedMessages } = require('../utils/receiveMessage');
const fs = require('fs');

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());

  on('task', {
    emptyFolder: (folderPath) => emptyFolder(folderPath),
  });

  on('task', {
    sendMessage ({ messageBody, topicName }) {
      return sendMessage({ messageBody, topicName });
    }
  });

  on('task', {
    startMessageReception (topicName) {
      startReceivingMessages(topicName);
      return null;
    },
    stopMessageReception () {
      stopReceivingMessages();
      return null;
    },
    fetchReceivedMessages (topicName) {
      return getReceivedMessages(topicName);
    },
    readFileIfExists (filePath) {
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }
      return null;
    },
    writeFile ({ filePath, data }) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return `File updated: ${filePath}`;
    }
  });

  console.log(on);
  console.log(config);
};