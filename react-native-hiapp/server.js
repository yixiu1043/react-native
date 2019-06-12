const express = require('express');
const sha1 = require('sha1');
const request = require('request');

const AppKey = 'kj7swf8ok3m02';
const AppSecret = 'jevIoQcu8awO6';
const Nonce = parseInt(Math.random() * 10000);
const Timestamp = new Date().getTime();
const Signature = AppSecret + Nonce + Timestamp;
const server = express();

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.get('/user/token', (req, res) => {
  const userId = req.query.userId || '';
  const name = req.query.name || '';
  const portraitUri = 'https://www.thetupian.com/thumbs/Jwj13kKSEQigrsDzV-JRQfZt3ebaj1xk1FW7_Ke9Xr9jrTXpsbWBGIEVok8UyB0kJOXDfmNMvU0dWGVx-8CfiA.jpg';

  request.post({
    url: 'http://api-cn.ronghub.com/user/getToken.json',
    form: {
      userId,
      name,
      portraitUri,
    },
    headers: {
      'App-Key': AppKey,
      Nonce,
      Timestamp,
      Signature: sha1(Signature),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
  (err, response, body) => {
    res.json(JSON.parse(body));
  });
});

server.listen(5050);
console.log('启动5050');

module.exports = {
  close: () => {
    server.close();
  },
};
