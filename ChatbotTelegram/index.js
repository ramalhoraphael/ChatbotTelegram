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

// Função para encerrar a conversa e deixá-la em stand-by
function encerrarConversa(chatId) {
  if (conversacoesAtivas[chatId]) {
    // Encerra a conversa atual, removendo o chat da lista
    delete conversacoesAtivas[chatId];

    // Envia mensagem informando que a conversa foi encerrada
    //bot.sendMessage(chatId, "Conversa encerrada. Você pode iniciar uma nova conversa a qualquer momento.");

    console.log(`Conversa com o chatId ${chatId} encerrada e colocada em stand-by.`);

    // Após encerrar, reiniciar a escuta de novas mensagens para o chat
    reiniciarConversa(chatId);
  }
}

// Função para reiniciar a escuta do bot após encerrar a conversa
function reiniciarConversa(chatId) {
  bot.on("message", (msg) => {
    if (msg.chat.id === chatId) {
      // Se o usuário enviar outra mensagem, reinicia uma nova conversa
      if (!conversacoesAtivas[chatId]) {
        console.log("Reiniciando uma nova conversa após o encerramento...");
        const conversacao = new Conversacao(bot, chatId, module.exports);
        conversacoesAtivas[chatId] = conversacao;
        conversacao.iniciarConversa();
      }
    }
  });
}

// Função principal que escuta mensagens e gerencia o fluxo da conversa
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  // Se não houver conversas ativas, cria uma nova
  if (!conversacoesAtivas[chatId]) {
    console.log("Iniciando uma nova conversa...");
    const conversacao = new Conversacao(bot, chatId, module.exports);
    conversacoesAtivas[chatId] = conversacao;
    conversacao.iniciarConversa();
  } else {
    console.log("Continuando conversa existente...");
    conversacoesAtivas[chatId].tratarRespostaUsuario(msg.text);
  }
});

// Função para encerrar a conversa a partir de outra classe (no seu caso, via menu)
function encerrarConversaExternamente(chatId) {
  encerrarConversa(chatId);
}

// Exporta a função para ser usada em outras classes
module.exports = {
  encerrarConversaExternamente,
};

// Funções para logar erros
bot.on("polling_error", (error) => console.log("Polling Error:", error));
bot.on("webhook_error", (error) => console.log("Webhook Error:", error));
bot.on("error", (error) => console.log("Erro Geral:", error));

console.log("Bot iniciado e aguardando mensagens...");
