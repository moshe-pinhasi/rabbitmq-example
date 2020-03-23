const amqp = require('amqplib/callback_api')
const CONN_URL = 'amqp://wpabyrur:GJToHC8q6y_7vhdiXz1ANVB4aw6XcoI2@crow.rmq.cloudamqp.com/wpabyrur';

let _channel = null;

module.exports = {
    connect: () => {
        return new Promise( (resolve, reject) => {
            amqp.connect(CONN_URL, function (err, conn) {
                conn.createChannel(function (err, channel) {
                    if (err) return reject(err)
                    _channel = channel
                   resolve(channel)
                   console.log("connected");
                })
            })
        });
    },
    listenToQueue:  async (queueName, cb) => {
        if (!_channel) return
        _channel.assertQueue(queueName);
        _channel.consume(queueName, cb, { noAck: true });
    },
}

process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});