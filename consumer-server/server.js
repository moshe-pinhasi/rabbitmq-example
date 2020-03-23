const express = require('express')
const {connect, listenToQueue} = require('./MQService')

const app = express()

connect().then (() => {
  listenToQueue('user-messages', function (msg) {
    console.log('.....');
    setTimeout(function(){
      console.log("Message:", msg.content.toString());
    })
  });
})

const port = process.env.PORT || 3500;

app.listen(port, () => {
    console.log('Server is running on port: ' + port)
});