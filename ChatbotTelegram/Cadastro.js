// Cadastro.js
class Cadastro {
    constructor(bot, chatId) {
        this.bot = bot;
        this.chatId = chatId;
        this.dados = {};
    }

    // Pede ao usuário o nome
    async solicitarNome() {
        await this.bot.sendMessage(this.chatId, "Por favor, digite seu nome.");
    }

    // Pede ao usuário o e-mail
    async solicitarEmail() {
        await this.bot.sendMessage(
            this.chatId,
            "Por favor, digite seu e-mail.",
        );
    }

    // Pede ao usuário se ele é síndico
    async solicitarSindico() {
        await this.bot.sendMessage(
            this.chatId,
            "Você é síndico? Digite sim ou não.",
        );
    }

    // Pede ao usuário a quantidade de apartamentos
    async solicitarQuantidadeApartamentos() {
        await this.bot.sendMessage(
            this.chatId,
            "Quantos apartamentos existem no condomínio?",
        );
    }

    // Pede ao usuário o número de telefone
    async solicitarTelefone() {
        await this.bot.sendMessage(
            this.chatId,
            "Por favor, digite seu número de telefone.",
        );
    }

    // Pede ao usuário o CEP
    async solicitarCEP() {
        await this.bot.sendMessage(this.chatId, "Por favor, digite o seu CEP.");
    }

    // Pede ao usuário o número da casa
    async solicitarNumeroCasa() {
        await this.bot.sendMessage(this.chatId, "Qual o número da sua casa?");
    }

    // Pede ao usuário o número do apartamento
    async solicitarNumeroApartamento() {
        await this.bot.sendMessage(
            this.chatId,
            "Qual o número do seu apartamento?",
        );
    }

    // Pede ao usuário o bloco do apartamento
    async solicitarBlocoApartamento() {
        await this.bot.sendMessage(
            this.chatId,
            "Qual o bloco do seu apartamento?",
        );
    }

    // Confirma os dados coletados
    async confirmarDados() {
        let textoConfirmacao = "Por favor, confirme os dados informados:\n";
        Object.keys(this.dados).forEach((key, index) => {
            textoConfirmacao += `${index + 1}. ${key}: ${this.dados[key]}\n`;
        });

        textoConfirmacao +=
            "\nDigite 1 para confirmar ou 2 para alterar algum dado.";
        await this.bot.sendMessage(this.chatId, textoConfirmacao);
    }

    // Processa a confirmação do usuário
    async processarConfirmacao(msg) {
        const resposta = msg.text;

        if (resposta === "1") {
            await this.bot.sendMessage(
                this.chatId,
                "Cadastro confirmado! Obrigado.",
            );
            this.finalizarCadastro();
        } else if (resposta === "2") {
            await this.bot.sendMessage(
                this.chatId,
                "Qual campo você gostaria de alterar? Digite o número correspondente.",
            );
        } else {
            await this.bot.sendMessage(
                this.chatId,
                "Resposta inválida. Digite 1 para confirmar ou 2 para alterar.",
            );
        }
    }

    // Finaliza o cadastro
    finalizarCadastro() {
        // A lógica para geração do ID e coletas pode ser inserida aqui
        const { quantidadeApartamentos } = this.dados;
        let coleta;

        if (quantidadeApartamentos <= 10) {
            coleta = "uma vez por semana";
        } else if (quantidadeApartamentos <= 20) {
            coleta = "duas vezes por semana";
        } else {
            coleta = "de segunda a sexta-feira";
        }

        this.bot.sendMessage(
            this.chatId,
            `Seu ID foi gerado e a coleta no seu condomínio será ${coleta}.`,
        );
    }
}

module.exports = Cadastro;
