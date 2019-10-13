// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const http = require('http');
const {
    getSlotValue,
}= require('ask-sdk-core');

const getRemoteData = function(url){
    return new Promise((resolve,reject)=>{
        const client= url.startsWith('https') ? require('https') : require('http');
        const request = client.get(url,(response)=>{
            //faltan cosas
            const body=[];
            response.on('data',(chunk)=> body.push(chunk));
            response.on('end',()=> resolve(body.join('')));
        })
    })
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const speakOutput = 'Bienvenido al servicio de impresión 3D por voz creado por CraftYorVoys.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const BorrarIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'BorrarIntent';
    },
    async handle(handlerInput) {
        var speakOutput = 'Borrando';
        await getRemoteData('http://impresorahacker.tk:8080/borrar')
            .then((response)=>{
                const data= JSON.parse(response);
                speakOutput= 'Borrado';
        
            })
         return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const CuboIntentHandler = {
        canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CuboIntent';
    },
    async handle(handlerInput) {
        var speakOutput = ' nada';
        const tamanox = getSlotValue(handlerInput.requestEnvelope,'tamanox');
        const tamanoy = getSlotValue(handlerInput.requestEnvelope,'tamanoy');
        const tamanoz = getSlotValue(handlerInput.requestEnvelope,'tamanoz');
        
        const posicionx = getSlotValue(handlerInput.requestEnvelope,'posicionx');
        const posiciony = getSlotValue(handlerInput.requestEnvelope,'posiciony');
        const posicionz = getSlotValue(handlerInput.requestEnvelope,'posicionz');
        
        speakOutput="Generando cubo";
        await getRemoteData('http://impresorahacker.tk:8080/cub?x='+posicionx+'&y='+posiciony+'&z='+posicionz+'&a='+tamanox+'&l='+tamanoy+'&p='+tamanoz)
        .then((response)=>{
            const data= JSON.parse(response);
            speakOutput= 'Cubo creado en la posición '+posicionx+', '+posiciony+ ', ' + posicionz;
    
        })
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const CilindroIntentHandler = {
        canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CilindroIntent';
    },
    async handle(handlerInput) {
        var speakOutput = ' nada';
        const radio = getSlotValue(handlerInput.requestEnvelope,'radio');
        const altura = getSlotValue(handlerInput.requestEnvelope,'altura');
        
        const posicionx = getSlotValue(handlerInput.requestEnvelope,'posicionx');
        const posiciony = getSlotValue(handlerInput.requestEnvelope,'posiciony');
        const posicionz = getSlotValue(handlerInput.requestEnvelope,'posicionz');
        
        speakOutput="Generando cilindro";
        //TODO: 
        await getRemoteData('http://impresorahacker.tk:8080/cilindre?x='+posicionx+'&y='+posiciony+'&z='+posicionz+'&r='+radio+'&a='+altura)
        .then((response)=>{
            const data= JSON.parse(response);
            speakOutput= 'Cilindro creado en la posición '+posicionx+', '+posiciony+ ', ' + posicionz;
    
        })
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const EsferaIntentHandler = {
        canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EsferaIntent';
    },
    async handle(handlerInput) {
        var speakOutput = ' nada';
        const radio = getSlotValue(handlerInput.requestEnvelope,'radio');
        
        const posicionx = getSlotValue(handlerInput.requestEnvelope,'posicionx');
        const posiciony = getSlotValue(handlerInput.requestEnvelope,'posiciony');
        const posicionz = getSlotValue(handlerInput.requestEnvelope,'posicionz');
        
        speakOutput="Generando esfera";
        //TODO: 
        await getRemoteData('http://impresorahacker.tk:8080/esfera?x='+posicionx+'&y='+posiciony+'&z='+posicionz+'&r='+radio)
        .then((response)=>{
            const data= JSON.parse(response);
            speakOutput= 'Esfera creada en la posición '+posicionx+', '+posiciony+ ', ' + posicionz;
    
        })
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const ImprimirIntentHandler = {
        canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ImprimirIntent';
    },
    async handle(handlerInput) {
        var speakOutput = ' nada';
        
        speakOutput="Mandando a imprimir";
        //TODO: 
        await getRemoteData('http://impresorahacker.tk:8080/imprimir')
        .then((response)=>{
            const data= JSON.parse(response);
            speakOutput= 'La orden se ha enviado a la impresora, este proceso puede tardar unos minutos. Gracias.';
    
        })
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const GeneraTerrenoRandomIntentHandler = {
        canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GeneraTerrenoRandomIntent';
    },
    async handle(handlerInput) {
        var speakOutput = ' nada';
            speakOutput="Generando un terreno aleatorio, espere un momento";
            //TODO: no existe el endpoint!!
            await getRemoteData('http://impresorahacker.tk:8080/GeneraTerrenoAleatorio')
            .then((response)=>{
                const data= JSON.parse(response);
                speakOutput= 'Funciona la llamada a terreno aleatorio.';
        
            })
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Qué quieres que imprima?, actualmente tenemos 3 tipos de funcionalidades, puedo pintar esferas, cubos y cilindros. indica sus dimensiones y su posición. muchas gracias';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Adios!, esperamos verle de nuevo. Muchas gracias.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Lo siento, Tengo problemas para hacer lo que me pides. Por favor prueba de nuevo.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        BorrarIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        CuboIntentHandler,
        GeneraTerrenoRandomIntentHandler,
        CilindroIntentHandler,
        EsferaIntentHandler,
        ImprimirIntentHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
