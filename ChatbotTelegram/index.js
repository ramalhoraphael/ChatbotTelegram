require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const Conversacao = require("./Conversacao");

// Configurando o bot com token em arquivo protegido
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: {
    interval: 1000,
    timeout: 10,
    retries: 3,
    params: { timeout: 10 },
  },
});

// Armazenar as conversações ativas
const conversacoesAtivas = {};

// funcao node telegram para responder a qualquer mensagem e iniciar ou continuar a conversação
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

//verifica se nao ha conversas ativas, e cria uma nova.
//chama a função de boas vindas
  if (!conversacoesAtivas[chatId]) {
    const conversacao = new Conversacao(bot, chatId);
    conversacoesAtivas[chatId] = conversacao;
    conversacao.iniciarConversa();

//se ja houver houver conversas ativas
//apenas chama a funcao para o menu de opcoes     
  } else {
     conversacoesAtivas[chatId].tratarRespostaUsuario(msg.text);
  }
});

// Funções para logar erros
bot.on("polling_error", (error) => console.log("Polling Error:", error));
bot.on("webhook_error", (error) => console.log("Webhook Error:", error));
bot.on("error", (error) => console.log("Erro Geral:", error));

console.log("Bot iniciado e aguardando mensagens...");