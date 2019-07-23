const { createSender, registerReceiver } = require('../src/rabbitmq-client');

const mqUrl = 'amqp://rabbitadmin:password123@localhost';
const sender = createSender(mqUrl);
const queue = 'hello';

registerReceiver(mqUrl, queue, msg => {
    console.log(`Receiving message:${msg.content.toString()}`);
});

sender(queue, 'the first msg');
sender(queue, JSON.stringify({id: 101, name: 'the second msg'}));
sender(queue, JSON.stringify({id: 102, name: 'the third msg', valid: false}));

setTimeout(() => {
    process.exit(0);
}, 1000);