// Importando o módulo dotenv e TelegramBot
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

// Importando a classe de conversação
const Conversacao = require("./Conversacao");

// Configurando o bot
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

// Responde a qualquer mensagem e inicia ou continua a conversação
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  // Verifica se já existe uma conversação ativa para o chatId
  if (!conversacoesAtivas[chatId]) {
    // Cria uma nova instância de conversação e armazena
    const conversacao = new Conversacao(bot, chatId);
    conversacoesAtivas[chatId] = conversacao;

    // Inicia a conversação sem passar msg
    conversacao.iniciarConversa();
  } else {
    // Caso já exista uma conversação ativa, delega o tratamento para a conversação
    /*conversacoesAtivas[chatId].tratarRespostaUsuario(msg);*/
  }
});

//


// Funções para logar erros
bot.on("polling_error", (error) => console.log("Polling Error:", error));
bot.on("webhook_error", (error) => console.log("Webhook Error:", error));
bot.on("error", (error) => console.log("Erro Geral:", error));

console.log("Bot iniciado e aguardando mensagens...");
