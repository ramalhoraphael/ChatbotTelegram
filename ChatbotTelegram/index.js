// Importando o módulo da API do Telegram
const TelegramBot = require('node-telegram-bot-api');

// Token do bot
const token = process.env.TELEGRAM_TOKEN; // Usar a variável de ambiente

// Configurando o bot
const bot = new TelegramBot(token, {
  polling: {
    interval: 1000,   // Intervalo entre verificações de novas mensagens
    timeout: 10,      // Timeout da requisição para API do Telegram
    retries: 3,       // Tentativas de reconexão em caso de erro
    params: {
      timeout: 10     // Timeout da requisição em segundos
    }
  }
});

// Função para lidar com o comando /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name;

  // Envia uma mensagem de boas-vindas
  bot.sendMessage(chatId, `Olá, ${name}! O bot está funcionando!`);
});

// Função para lidar com o comando /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Aqui estão os comandos disponíveis:\n/start - Começar o bot\n/help - Ver ajuda');
});

// Função para logar erros de polling e webhook
bot.on("polling_error", (error) => {
  console.log("Polling Error:", error);  // Log de erro de polling
});

bot.on("webhook_error", (error) => {
  console.log("Webhook Error:", error);  // Log de erro de webhook
});

// Lidar com erros de timeout de conexão com a API
bot.on("error", (error) => {
  console.log("Erro Geral:", error);  // Logar erros gerais
});

// Logar quando o bot iniciar corretamente
bot.on('polling_error', (error) => {
  console.log("Erro de Polling:", error);
});

// Mantém o bot ativo para não fechar
console.log("Bot iniciado, aguardando comandos...");