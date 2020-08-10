const TelegramBot = require('node-telegram-bot-api');
const dialogFlow = require('./dialogflow');

const token = '1179136040:AAFWBJTZU85GBTbvwqdIWNr16ifQ9JJUOWk';

const bot = new TelegramBot(token, {polling: true});

bot.on('message',async (msg) =>{
    const chatId = msg.chat.id;

    const response = await dialogFlow.sendMessage(chatId.toString(),msg.text);

    if(!response){
        bot.sendMessage(chatId,'Não entendi, por favor, refaça a mensagem!')
    }else{
        bot.sendMessage(chatId,response.text);
    }

})