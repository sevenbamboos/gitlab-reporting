const amqp = require('amqplib/callback_api');

exports.createSender = function(url) {
    return function(queue, msg) {
        amqp.connect(url, function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
        
                channel.assertQueue(queue, {
                    durable: false
                });
                channel.sendToQueue(queue, Buffer.from(msg));
        
                console.log(" [x] Sent %s", msg);
            });
        
            setTimeout(function() {
                connection.close();
                // process.exit(0);
            }, 500);
        });
    };
};

exports.registerReceiver = function(url, queue, onMessage) {
    amqp.connect(url, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
    
            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Start listening to %s", queue);

            channel.consume(queue, onMessage, { noAck: true }); 
        });
    });
};
