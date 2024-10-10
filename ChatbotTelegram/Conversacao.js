const Cadastrar = require('./Cadastrar');
const AlterarCadastro = require('./AlterarCadastro');
const Cliente = require('./Cliente');  // Supondo que o cliente seja uma classe que você criou

class Conversacao {
    constructor(bot, chatId) {
        this.bot = bot;
        this.chatId = chatId;
        this.cliente = new Cliente();
        this.step = 0;

        // Instanciando Cadastrar e AlterarCadastro no início
        this.cadastrar = new Cadastrar(this.bot, this.chatId);
        this.alterarCadastro = new AlterarCadastro(this.bot, this.chatId, this.cliente);
    }

    async iniciarConversa() {
        await this.bot.sendMessage(this.chatId, "Bem-vindo ao Chat Geral - Cadastro de Condomínios para coleta seletiva");
        await this.bot.sendMessage(this.chatId, `Escolha uma das opções abaixo:\n\n1. Para se cadastrar\n2. Alterar cadastro\n3. Acessar página web do ChatGeral\n4. Sair`);

        this.bot.once('message', async (msg) => {
            await this.tratarRespostaUsuario(msg.text);
        });
    }

    async tratarRespostaUsuario(resposta) {
        switch (resposta) {
            case "1":
                await this.cadastrar.cadastrarCliente();  // Chama o método da instância já criada
                break;
            case "2":
                await this.alterarCadastro.alterarDadosCliente();  // Chama o método da instância já criada
                break;
            case "3":
                await this.bot.sendMessage(this.chatId, "Acessando página web do Chat Geral...");
                // Aqui você pode adicionar o link da página web ou mais informações.
                break;
            default:
                await this.bot.sendMessage(this.chatId, "Resposta inválida. Digite 1 para iniciar o cadastro, 2 para alterar ou 3 para acessar a página web.");
                await this.iniciarConversa();  // Recomeça a conversa em caso de erro
                break;
        }
    }
}

module.exports = Conversacao;
