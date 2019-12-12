var token = '1013855624:AAEXB4uMTYdZBzMFHW1nbcpZqjJAS8FQ4As';

var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, { polling: true });

console.log('bot server started...');

bot.onText(/^\/mighty_mighty/, function (msg) {
  bot.sendMessage(msg.chat.id, 'Yemit').then(function () {
    // reply sent!
  });
});
