const { ServiceBusClient } = require('@azure/service-bus');

const connectionString = 'Endpoint=sb://sndffcinfsb1001.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=y44k/5in27gEE/HoNBP9tX943lPBKAcfZaBtzKCSqS0=';
const topicName = 'ffc-pay-request-kj';

async function sendMessage ()   {
  const serviceBusClient = new ServiceBusClient(connectionString);
  const messageSender = serviceBusClient.createSender(topicName);
  const messageBody = `{
    "sourceSystem": "AHWR",
    "frn": 1234567890,
    "sbi": 123456789,
    "marketingYear": 2022,
    "paymentRequestNumber": 1,
    "paymentType": 1,
    "correlationId": "123e4567-e89b-12d3-a456-426655440000",
    "invoiceNumber": "S1234567S1234567V001",
    "agreementNumber": "AHWR12345678",
    "contractNumber": "S1234567",
    "currency": "GBP",
    "schedule": "Q4",
    "dueDate": "09/11/2022",
    "value": 500,
    "debtType": "irr",
    "recoveryDate": "09/11/2021",
    "pillar": "DA",
    "originalInvoiceNumber": "S1234567S1234567V001",
    "originalSettlementDate": "09/11/2021",
    "invoiceCorrectionReference": "S1234567S1234567V001",
    "trader": "123456A",
    "vendor": "123456A",
    "invoiceLines": [
      {
        "value": 500,
        "description": "G00 - Gross value of claim",
        "schemeCode": "A1234",
        "standardCode": "ahwr-cows",
        "accountCode": "SOS123",
        "deliveryBody": "RP00",
        "marketingYear": 2022,
        "convergence": false,
        "stateAid": false
      }
    ]
  }`;
  const message = {
    body: messageBody
  };
  try {
    await messageSender.sendMessages(message);
    console.log('Kiran, Your message sent successfully!');
  } finally {
    await messageSender.close();
    await serviceBusClient.close();
  }
}
sendMessage();