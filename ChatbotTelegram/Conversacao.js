const Cliente = require('./Cliente');
const Index = require('./index'); // Certifique-se de que o Index está implementado

class Conversacao {
    constructor(bot, chatId) {
        this.bot = bot;
        this.chatId = chatId;
        this.cliente = new Cliente(); // Instancia o cliente
        this.step = 0; // Variável para controlar o fluxo de perguntas
    }

    // Método inicial da conversação
    async iniciarConversa() {
      await this.bot.sendMessage(this.chatId, "Bem-vindo ao Chat Geral - Cadastro para coleta seletiva");
      await this.bot.sendMessage(this.chatId, "Digite 1 para iniciar o cadastro ou 2 para sair.");

      // Listener para capturar a resposta inicial do usuário
      this.bot.once('message', async (escolha) => {
          // Garantindo que o valor de `this` se refira à classe atual
          await this.tratarRespostaUsuario(escolha.text);
      });
  }

  async tratarRespostaUsuario(resposta) {
      if (resposta === "1") {
          await this.cadastrarCliente(); 
      } else if (resposta === "2") {
          await this.bot.sendMessage(this.chatId, "Cadastro cancelado.");
      } else {
          await this.bot.sendMessage(this.chatId, "Resposta inválida. Digite 1 para iniciar o cadastro ou 2 para cancelar.");
          await this.iniciarConversa(); 
      }
  }


  // Método de cadastramento
  async cadastrarCliente() {
      await this.solicitarNome();          // Inicia solicitando o nome
      //await this.solicitarEmail();         // Em seguida, solicita o e-mail
      //await this.solicitarSindico();       // Pergunta se é síndico
      //await this.solicitarQuantidadeApartamentos();  // Coleta a quantidade de apartamentos
      //await this.solicitarTelefone();      // Coleta o número de telefone
      //await this.solicitarCEP();           // Coleta o CEP/endereço
      //await this.solicitarNumeroApartamento(); // Coleta o número do apartamento
      //await this.solicitarBlocoApartamento();  // Coleta o bloco do apartamento
      //await this.confirmarCadastro();      // Finaliza confirmando o cadastro
  }

  // Coleta e define o nome
  async solicitarNome() {
      await this.bot.sendMessage(this.chatId, "Por favor, digite seu nome.");
      this.bot.once('message', async (msg) => {
          this.cliente.nome = msg.text; // Utiliza o setter (sem parênteses)
          await this.solicitarEmail();
      });
  }
/*
  // Coleta e define o e-mail
  async solicitarEmail() {
      await this.bot.sendMessage(this.chatId, "Por favor, digite seu e-mail.");
      this.bot.once('message', async (msg) => {
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          if (emailRegex.test(msg)) {
            this.cliente.email = msg.text;
          } else {
              console.log("E-mail inválido. Por favor, insira um e-mail válido.");
              await this.bot.sendMessage(this.chatId, "E-mail inválido. Por favor, insira um e-mail válido.");
              await this.solicitarEmail();
            }
          await this.solicitarSindico();
      });
  }
*/// Coleta e define o e-mail com validação contínua
  async solicitarEmail() {
    let emailValido = false;

    // Loop enquanto o e-mail não for válido
    while (!emailValido) {
      await this.bot.sendMessage(this.chatId, "Por favor, digite seu e-mail.");

      // Aguardando a resposta do usuário
      const resposta = await new Promise(resolve => {
        this.bot.once('message', resolve);
      });

      // Verifica se o e-mail está em um formato válido
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (emailRegex.test(resposta.text)) {
        this.cliente.email = resposta.text; // Utiliza o setter para armazenar o e-mail
        emailValido = true; // E-mail válido, sair do loop
      } else {
        // Envia uma mensagem de erro e repete a solicitação
        console.log("E-mail inválido. Por favor, insira um e-mail válido.");
        await this.bot.sendMessage(this.chatId, "E-mail inválido. Por favor, insira um e-mail válido.");
      }
    }

    // Após a validação, chama a próxima etapa do cadastro
    await this.solicitarSindico();
  }

  
  
  // Coleta e define se é síndico
  async solicitarSindico() {
      await this.bot.sendMessage(this.chatId, "Você é síndico? Digite sim ou não.");
      this.bot.once('message', async (msg) => {
          const sindico = msg.text.toLowerCase() === 'sim';
          this.cliente.sindico = sindico; // Utiliza o setter (sem parênteses)
          await this.solicitarQuantidadeApartamentos();
      });
  }

  // Coleta e define a quantidade de apartamentos
  async solicitarQuantidadeApartamentos() {
      await this.bot.sendMessage(this.chatId, "Quantos apartamentos existem no condomínio?");
      this.bot.once('message', async (msg) => {
          this.cliente.qtdApartamentos = parseInt(msg.text); // Utiliza o setter (sem parênteses)
          await this.solicitarTelefone();
      });
  }

  // Coleta e define o telefone
  async solicitarTelefone() {
      await this.bot.sendMessage(this.chatId, "Por favor, digite seu número de telefone.");
      this.bot.once('message', async (msg) => {
          this.cliente.telefone = msg.text; // Utiliza o setter (sem parênteses)
          await this.solicitarCEP();
      });
  }

  // Coleta e define o CEP
  async solicitarCEP() {
      await this.bot.sendMessage(this.chatId, "Por favor, digite seu CEP.");
      this.bot.once('message', async (msg) => {
          this.cliente.endereco = msg.text; // Utiliza o setter (sem parênteses)
          await this.solicitarNumeroApartamento();
      });
  }

  // Coleta e define o número do apartamento
  async solicitarNumeroApartamento() {
      await this.bot.sendMessage(this.chatId, "Qual o número do seu apartamento?");
      this.bot.once('message', async (msg) => {
          this.cliente.apartamento = msg.text; // Utiliza o setter (sem parênteses)
          await this.solicitarBlocoApartamento();
      });
  }

  // Coleta e define o bloco do apartamento
  async solicitarBlocoApartamento() {
      await this.bot.sendMessage(this.chatId, "Qual o bloco do seu apartamento?");
      this.bot.once('message', async (msg) => {
          this.cliente.bloco = msg.text; // Utiliza o setter (sem parênteses)
          await this.confirmarCadastro();
      });
  }
 

    // Confirmação final dos dados
    async confirmarCadastro() {
        const dadosCliente = this.cliente.toString(); // Usa o toString para apresentar os dados
        await this.bot.sendMessage(this.chatId, `Por favor, confirme os dados informados:\n${dadosCliente}\nDigite 1 para confirmar ou 2 para alterar.`);

        this.bot.once('message', async (msg) => {
            if (msg.text === "1") {
                await this.bot.sendMessage(this.chatId, "Cadastro confirmado! Obrigado.");
                await this.finalizarCadastro();
            } else if (msg.text === "2") {
                await this.bot.sendMessage(this.chatId, "Vamos alterar os dados.");
                await this.cadastrarCliente();
            } else {
                await this.bot.sendMessage(this.chatId, "Resposta inválida. Digite 1 para confirmar ou 2 para alterar.");
            }
        });
    }

    // Finaliza o cadastro
    async finalizarCadastro() {
        const coleta = this.definirColeta();
        this.bot.sendMessage(this.chatId, `Cadastro completo. Seu ID foi gerado e a coleta será realizada ${coleta}.`);
        Index.salvarCliente(this.cliente); // Exemplo de como você pode salvar o cliente no Index
    }

    // Define a frequência de coleta com base na quantidade de apartamentos
    definirColeta() {
        const qtd = this.cliente.getQtdApartamentos(); // Usa o getter
        if (qtd <= 10) return "uma vez por semana";
        if (qtd <= 20) return "duas vezes por semana";
        return "de segunda a sexta-feira";
    }
}

module.exports = Conversacao;
