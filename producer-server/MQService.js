const amqp = require('amqplib/callback_api')
const CONN_URL = 'amqp://wpabyrur:GJToHC8q6y_7vhdiXz1ANVB4aw6XcoI2@crow.rmq.cloudamqp.com/wpabyrur';

let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
   conn.createChannel(function (err, channel) {
      ch = channel;
   });
});

module.exports = {
    publishToQueue: async (queueName, data) => {
        console.log('data', data);
        
        ch.sendToQueue(queueName, Buffer.from(data));
    },
    listenToQueue:  async (queueName, cb) => {
        ch.consume(queueName, cb, { noAck: true });
    },
}

process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});