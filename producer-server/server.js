const express = require('express')
const bodyParser = require('body-parser')
const errorHandler = require('./errorHandler.middleware')
const {publishToQueue} = require('./MQService')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const queueName = "user-messages"
app.post('/', (req, res) => {
    
    publishToQueue(queueName, req.body.payload)
        .then (r => {
            res.send({msg: "producer-server: message-sent"})
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

// global error handler
app.use(errorHandler);

const port = process.env.PORT || 3400;

app.listen(port, () => {
    console.log('Server is running on port: ' + port)
});