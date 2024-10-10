// AlterarCadastro.js
const Cliente = require('./Cliente');

class AlterarCadastro {
    constructor(bot, chatId, cliente) {
        this.bot = bot;
        this.chatId = chatId;
        this.cliente = cliente;  // Reutilizando os dados do cliente
    }

    async alterarDadosCliente() {
        await this.mostrarInformacoes();
    }

    async mostrarInformacoes() {
        const dadosCliente = `
        1. Nome: ${this.cliente.nome}
        2. E-mail: ${this.cliente.email}
        3. Síndico: ${this.cliente.sindico ? 'Sim' : 'Não'}
        4. Quantidade de Apartamentos: ${this.cliente.qtdApartamentos}
        5. Telefone: ${this.cliente.telefone}
        6. CEP: ${this.cliente.endereco}
        7. Número do Apartamento: ${this.cliente.apartamento}
        8. Bloco: ${this.cliente.bloco}
        9. Voltar ao Menu
        `;
        await this.bot.sendMessage(this.chatId, `Informações cadastradas:\n${dadosCliente}`);
        
        await this.bot.sendMessage(this.chatId, "Digite o número da informação que deseja alterar ou 9 para voltar ao menu anterior.");

        this.bot.once('message', async (msg) => {
            await this.tratarAlteracao(msg.text);
        });
    }

    async tratarAlteracao(opcao) {
        switch (opcao) {
            case "1":
                await this.bot.sendMessage(this.chatId, "Digite o novo nome.");
                this.bot.once('message', async (msg) => {
                    this.cliente.nome = msg.text;
                    await this.bot.sendMessage(this.chatId, "Nome alterado com sucesso.");
                    await this.mostrarInformacoes();
                });
                break;
            case "2":
                await this.bot.sendMessage(this.chatId, "Digite o novo e-mail.");
                this.bot.once('message', async (msg) => {
                    this.cliente.email = msg.text;
                    await this.bot.sendMessage(this.chatId, "E-mail alterado com sucesso.");
                    await this.mostrarInformacoes();
                });
                break;
            case "3":
                await this.bot.sendMessage(this.chatId, "Você é síndico? Digite sim ou não.");
                this.bot.once('message', async (msg) => {
                    this.cliente.sindico = msg.text.toLowerCase() === 'sim';
                    await this.bot.sendMessage(this.chatId, "Sindico alterado com sucesso.");
                    await this.mostrarInformacoes();
                });
                break;
            case "4":
                await this.bot.sendMessage(this.chatId, "Digite a nova quantidade de apartamentos.");
                this.bot.once('message', async (msg) => {
                    this.cliente.qtdApartamentos = parseInt(msg.text);
                    await this.bot.sendMessage(this.chatId, "Quantidade de apartamentos alterada com sucesso.");
                    await this.mostrarInformacoes();
                });
                break;
            case "5":
                await this.bot.sendMessage(this.chatId, "Digite o novo número de telefone.");
                this.bot.once('message', async (msg) => {
                    this.cliente.telefone = msg.text;
                    await this.bot.sendMessage(this.chatId, "Telefone alterado com sucesso.");
                    await this.mostrarInformacoes();
                });
                break;
            case "6":
                await this.bot.sendMessage(this.chatId, "Digite o novo CEP.");
                this.bot.once('message', async (msg) => {
                    this.cliente.endereco = msg.text;
                    await this.bot.sendMessage(this.chatId, "CEP alterado com sucesso.");
                    await this.mostrarInformacoes();
                });
                break;
            case "7":
                await this.bot.sendMessage(this.chatId, "Digite o novo número do apartamento.");
                this.bot.once('message', async (msg) => {
                    this.cliente.apartamento = msg.text;
                    await this.bot.sendMessage(this.chatId, "Número do apartamento alterado com sucesso.");
                    await this.mostrarInformacoes();
                });
                break;
            case "8":
                await this.bot.sendMessage(this.chatId, "Digite o novo bloco.");
                this.bot.once('message', async (msg) => {
                    this.cliente.bloco = msg.text;
                    await this.bot.sendMessage(this.chatId, "Bloco
