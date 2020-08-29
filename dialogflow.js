const dialogflow = require('dialogflow');
const configs = require('./dio_bot_carrefour.json');

const sessionCliente = new dialogflow.SessionsClient({
    projectId:configs.projectId,
    credentials:{
        private_key:configs.private_key,
        client_email:configs.client_email
    }
});

async function sendMessage(chatId,message){
    const sessionPath = sessionCliente.sessionPath(configs.project_id,chatId);
    const request = {
        session:sessionPath,
        queryInput:{
            text:{
                text:message,
                languageCode:'pt-BR'
            }
        }
    }

    const responses = await sessionCliente.detectIntent(request);
    const result = responses[0].queryResult;

    if(result.action == 'input.unknown'){
        return false; 
    }else{
        return {
            text:result.fulfillmentText,
            intent:result.intent.displayName,
            fields:result.parameters.fields
        }
    }

}

module.exports.sendMessage = sendMessage;