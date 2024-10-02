// Conversacao.js
class Conversacao {
  constructor(bot) {
    this.bot = bot;
  }

  enviarMensagem(chatId, texto) {
    return this.bot.sendMessage(chatId, texto);
  }

  // Lida com a primeira mensagem, ativando o bot
  iniciarConversa(msg) {
    const chatId = msg.chat.id;
    const texto = `Olá, eu sou o bot do ChatGeral. Digite 1 para cadastrar, digite 2 para sair.`;
    this.enviarMensagem(chatId, texto);
  }

  // Lida com a escolha do usuário após a mensagem inicial
  escolhaUsuario(msg, callback) {
    const chatId = msg.chat.id;
    const resposta = msg.text;

    if (resposta === "1") {
      callback("cadastro");
    } else if (resposta === "2") {
      this.enviarMensagem(chatId, "Obrigado! Encerrando o bot...");
      process.exit();
    } else {
      this.enviarMensagem(
        chatId,
        "Resposta inválida. Tente novamente: Digite 1 para cadastrar ou 2 para sair.",
      );
    }
  }
}

module.exports = Conversacao;
