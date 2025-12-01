require('dotenv').config();

module.exports = () => {

  const iss = process.env.NOTIFY_API_ISS;
  const secret = process.env.NOTIFY_API_SECRET;

  let payload = {  iss: iss,
    iat: Math.floor(Date.now() / 1000) };
  let options = { algorithm: 'HS256', expiresIn: '1h' };


  return require('jsonwebtoken').sign(payload, secret, options);
};