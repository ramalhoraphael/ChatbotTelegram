// Cadastrar.js
const Cliente = require('./Cliente');

class Cadastrar {
    constructor(bot, chatId) {
        this.bot = bot;
        this.chatId = chatId;
        this.cliente = new Cliente();
    }

    async cadastrarCliente() {
        await this.solicitarNome();
    }

    async solicitarNome() {
        await this.bot.sendMessage(this.chatId, "Por favor, digite seu nome.");
        this.bot.once('message', async (msg) => {
            const nome = msg.text.trim();
            if (nome && nome.length > 0 && /^[a-zA-Z\s]+$/.test(nome)) {  // Valida se o nome contém apenas letras e espaços
                this.cliente.nome = nome;
                await this.solicitarEmail();
            } else {
                await this.bot.sendMessage(this.chatId, "Nome inválido. Por favor, digite um nome válido.");
                await this.solicitarNome();  // Re-pede o nome se inválido
            }
        });
    }
    

    async solicitarEmail() {
        let emailValido = false;
        while (!emailValido) {
            await this.bot.sendMessage(this.chatId, "Por favor, digite seu e-mail.");
            const resposta = await new Promise(resolve => {
                this.bot.once('message', resolve);
            });

            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (emailRegex.test(resposta.text)) {
                this.cliente.email = resposta.text;
                emailValido = true;
            } else {
                await this.bot.sendMessage(this.chatId, "E-mail inválido. Por favor, insira um e-mail válido.");
            }
        }
        await this.solicitarSindico();
    }

    async solicitarSindico() {
        await this.bot.sendMessage(this.chatId, "Você é síndico? Digite sim ou não.");
        this.bot.once('message', async (msg) => {
            this.cliente.sindico = msg.text.toLowerCase() === 'sim';
            await this.solicitarQuantidadeApartamentos();
        });
    }

    async solicitarQuantidadeApartamentos() {
        await this.bot.sendMessage(this.chatId, "Quantos apartamentos existem no condomínio?");
        this.bot.once('message', async (msg) => {
            this.cliente.qtdApartamentos = parseInt(msg.text);
            await this.solicitarTelefone();
        });
    }

    async solicitarTelefone() {
        await this.bot.sendMessage(this.chatId, "Por favor, digite seu número de telefone.");
        this.bot.once('message', async (msg) => {
            this.cliente.telefone = msg.text;
            await this.solicitarCEP();
        });
    }

    async solicitarCEP() {
        await this.bot.sendMessage(this.chatId, "Por favor, digite seu CEP.");
        this.bot.once('message', async (msg) => {
            this.cliente.endereco = msg.text;
            await this.solicitarNumeroApartamento();
        });
    }

    async solicitarNumeroApartamento() {
        await this.bot.sendMessage(this.chatId, "Qual o número do seu apartamento?");
        this.bot.once('message', async (msg) => {
            this.cliente.apartamento = msg.text;
            await this.solicitarBlocoApartamento();
        });
    }

    async solicitarBlocoApartamento() {
        await this.bot.sendMessage(this.chatId, "Qual o bloco do seu apartamento?");
        this.bot.once('message', async (msg) => {
            this.cliente.bloco = msg.text;
            await this.confirmarCadastro();
        });
    }

    async confirmarCadastro() {
        const dadosCliente = this.cliente.toString();
        await this.bot.sendMessage(this.chatId, `Por favor, confirme os dados informados:\n${dadosCliente}\nDigite 1 para confirmar ou 2 para alterar.`);

        this.bot.once('message', async (msg) => {
            if (msg.text === "1") {
                await this.bot.sendMessage(this.chatId, "Cadastro confirmado! Obrigado.");
                await this.finalizarCadastro();
            } else if (msg.text === "2") {
                await this.bot.sendMessage(this.chatId, "Vamos alterar os dados.");
                await this.cadastrarCliente();  // Re-inicia o cadastro
            } else {
                await this.bot.sendMessage(this.chatId, "Resposta inválida. Digite 1 para confirmar ou 2 para alterar.");
            }
        });
    }

    async finalizarCadastro() {
        const coleta = this.definirColeta();
        await this.bot.sendMessage(this.chatId, `Cadastro completo. Seu ID foi gerado e a coleta será realizada ${coleta}.`);
    }

    definirColeta() {
        const qtd = this.cliente.qtdApartamentos;
        if (qtd <= 10) return "uma vez por semana";
        if (qtd <= 20) return "duas vezes por semana";
        return "de segunda a sexta-feira";
    }
}

module.exports = Cadastrar;
