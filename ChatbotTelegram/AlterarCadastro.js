const Cliente = require('./Cliente');

class AlterarCadastro {
    constructor(bot, chatId, cliente) {
        this.bot = bot;
        this.chatId = chatId;
        this.cliente = cliente;  
    }

    async alterarDadosCliente() {
        // Pergunta pelo CEP de 8 dígitos
        await this.bot.sendMessage(this.chatId, "Por favor, digite os 8 dígitos do CEP.");
        
        this.bot.once('message', async (msg) => {
            const cep = msg.text;
    
            // Validação do CEP (simples para 8 dígitos)
            if (/^\d{8}$/.test(cep)) {
                this.cliente.cep = cep;
    
                // Pergunta pelo número da residência
                await this.bot.sendMessage(this.chatId, "Agora, digite o número da residência.");
    
                this.bot.once('message', async (msg) => {
                    const numeroResidencia = msg.text;
    
                    // Validação para o número da residência
                    if (/^\d+$/.test(numeroResidencia)) {
                        this.cliente.numeroResidencia = numeroResidencia;
    
                        // Pergunta pelo telefone
                        await this.bot.sendMessage(this.chatId, "Digite o número de telefone (somente os 9 dígitos, sem DDD).");
    
                        this.bot.once('message', async (msg) => {
                            const telefone = msg.text;
    
                            // Validação do telefone (9 dígitos)
                            if (/^\d{9}$/.test(telefone)) {
                                this.cliente.telefone = telefone;
    
                                // Confirmação do número de telefone
                                await this.bot.sendMessage(this.chatId, "Número de telefone confirmado!");
    
                                // Chama a função para mostrar as informações atualizadas
                                await this.mostrarInformacoes();
                            } else {
                                // Opções para número de telefone inválido
                                await this.bot.sendMessage(this.chatId, "Telefone inválido. Escolha uma opção:\n1. Digitar novamente\n2. Retornar ao menu anterior");
                                this.bot.once('message', async (msg) => {
                                    if (msg.text === "1") {
                                        await this.alterarDadosCliente();
                                    } else if (msg.text === "2") {
                                        await this.menuOpcoes();
                                    } else {
                                        await this.bot.sendMessage(this.chatId, "Opção inválida. Vamos tentar novamente.");
                                        await this.alterarDadosCliente();
                                    }
                                });
                            }
                        });
                    } else {
                        // Opções para número de residência inválido
                        await this.bot.sendMessage(this.chatId, "Número de residência inválido. Escolha uma opção:\n1. Digitar novamente\n2. Retornar ao menu anterior");
                        this.bot.once('message', async (msg) => {
                            if (msg.text === "1") {
                                await this.alterarDadosCliente();
                            } else if (msg.text === "2") {
                                await this.menuOpcoes();
                            } else {
                                await this.bot.sendMessage(this.chatId, "Opção inválida. Vamos tentar novamente.");
                                await this.alterarDadosCliente();
                            }
                        });
                    }
                });
            } else {
                // Opções para CEP inválido
                await this.bot.sendMessage(this.chatId, "CEP inválido. Escolha uma opção:\n1. Digitar novamente\n2. Retornar ao menu anterior");
                this.bot.once('message', async (msg) => {
                    if (msg.text === "1") {
                        await this.alterarDadosCliente();
                    } else if (msg.text === "2") {
                        await this.menuOpcoes();
                    } else {
                        await this.bot.sendMessage(this.chatId, "Opção inválida. Vamos tentar novamente.");
                        await this.alterarDadosCliente();
                    }
                });
            }
        });
    }
    

    async mostrarInformacoes() {
        const dadosCliente = `
        1. Nome: ${this.cliente.nome}
        2. E-mail: ${this.cliente.email}
        3. Síndico: ${this.cliente.sindico ? 'Sim' : 'Não'}
        4. Quantidade de Apartamentos: ${this.cliente.qtdApartamentos}
        5. Telefone: ${this.cliente.telefone}
        6. CEP: ${this.cliente.cep}
        7. Número da Residência: ${this.cliente.numeroResidencia}
        8. Número do Apartamento: ${this.cliente.apartamento}
        9. Bloco: ${this.cliente.bloco}
        10. Voltar ao Menu
        `;
        await this.bot.sendMessage(this.chatId, `Informações cadastradas:\n${dadosCliente}`);
        
        await this.bot.sendMessage(this.chatId, "Digite o número da informação que deseja alterar ou 10 para voltar ao menu anterior.");

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
                    this.cliente.cep = msg.text;
                    await this.bot.sendMessage(this.chatId, "CEP alterado com sucesso.");
                    await this.mostrarInformacoes();
                });
                break;
            case "7":
                await this.bot.sendMessage(this.chatId, "Digite o novo número da residência.");
                this.bot.once('message', async (msg) => {
                    this.cliente.numeroResidencia = msg.text;
                    await this.bot.sendMessage(this.chatId, "Número da residência alterado com sucesso.");
                    await this.mostrarInformacoes();
                });
                break;
            case "8":
                await this.bot.sendMessage(this.chatId, "Digite o novo número do apartamento.");
                this.bot.once('message', async (msg) => {
                    this.cliente.apartamento = msg.text;
                    await this.bot.sendMessage(this.chatId, "Número do apartamento alterado com sucesso.");
                    await this.mostrarInformacoes();
                });
                break;
            case "9":
                await this.bot.sendMessage(this.chatId, "Digite a nova quantidade de blocos.");
                this.bot.once('message', async (msg) => {
                    this.cliente.bloco = msg.text;
                    await this.bot.sendMessage(this.chatId, "Quantidade de blocos alterada com sucesso.");
                    await this.mostrarInformacoes();
                });
                break;
            case "10":
                await this.bot.sendMessage(this.chatId, "Voltando ao menu anterior...");
                    await this.menuOpcoes();
                break;
            default:
                await this.bot.sendMessage(this.chatId, "Opção inválida. Tente novamente.");
                await this.mostrarInformacoes();
                break;
        }
    }
}

module.exports = AlterarCadastro;
