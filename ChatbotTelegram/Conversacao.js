const Cadastrar = require('./Cadastrar');
const AlterarCadastro = require('./AlterarCadastro');
const Cliente = require('./Cliente');

class Conversacao {
    constructor(bot, chatId, index) {
        this.bot = bot;
        this.chatId = chatId;
        this.cliente = new Cliente();
        this.step = 0;
        this.index = index;

        // Instanciando Cadastrar e AlterarCadastro no início
        this.cadastrar = new Cadastrar(this.bot, this.chatId, this);
        this.alterarCadastro = new AlterarCadastro(this.bot, this.chatId, this.cliente);

        // Guardar o listener atual para poder removê-lo depois
        this.listener = null;
    }

    async iniciarConversa() {
        await this.bot.sendMessage(this.chatId, "Bem-vindo ao Chat Geral - Cadastro de Condomínios para coleta seletiva");
        await this.menuOpcoes();
    }

    async menuOpcoes() {
        await this.bot.sendMessage(this.chatId, `Escolha uma das opções abaixo:\n\n1. Para se cadastrar\n2. Alterar cadastro\n3. Acessar página web do ChatGeral\n4. Sair`);

        // Se já houver um listener, remove-o antes de adicionar outro
        if (this.listener) {
            this.bot.removeListener('message', this.listener);
        }

        // Cria um novo listener para esta conversa
        this.listener = async (msg) => {
            if (msg.chat.id === this.chatId) {  // Garante que está tratando apenas a conversa deste chat
                await this.tratarRespostaUsuario(msg.text);
            }
        };

        this.bot.on('message', this.listener);
    }

    async tratarRespostaUsuario(resposta) {
        switch (resposta) {
            case "1":
                await this.cadastrar.cadastrarCliente();
                break;
            case "2":
                await this.alterarCadastro.alterarDadosCliente();
                break;
            case "3":
                await this.bot.sendMessage(this.chatId, "Acessando página web do Chat Geral atraves do link:");
                await this.bot.sendMessage(this.chatId, "www.chatgeralcoletaseletiva.org");
                // ACRESCENTAR PAGINA WEB - VERIFICAR COM O GRUPO
                break;
            case "4":
                await this.bot.sendMessage(this.chatId, "Encerrando a conversa, até breve!");
                await this.index.encerrarConversaExternamente(this.chatId);  // Agora a função é chamada corretamente

                // Remove o listener ao encerrar a conversa
                if (this.listener) {
                    this.bot.removeListener('message', this.listener);
                    this.listener = null;  // Certifica que o listener é removido
                }
                break;
            default:
                await this.bot.sendMessage(this.chatId, "Resposta inválida. Digite 1 para iniciar o cadastro, 2 para alterar ou 3 para acessar a página web.");
                await this.menuOpcoes();  // Recomeça a conversa em caso de erro
                break;
        }
    }
}

module.exports = Conversacao;
