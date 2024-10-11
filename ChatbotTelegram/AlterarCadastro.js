const Cliente = require('./Cliente');

class AlterarCadastro {
    constructor(bot, chatId, cliente) {
        this.bot = bot;
        this.chatId = chatId;
        this.cliente = cliente; // Objeto Cliente existente, já cadastrado
    }

    async alterarDadosCliente() {
        await this.bot.sendMessage(this.chatId, "Qual informação você deseja alterar?\n1. CEP\n2. Número do Endereço\n3. Quantidade de Blocos\n4. Quantidade de Apartamentos\n5. Nome\n6. E-mail\n7. Síndico\n8. Telefone\n9. Bloco\n10. Apartamento");

        this.bot.once('message', async (msg) => {
            const escolha = msg.text.trim();

            switch (escolha) {
                case '1':
                    await this.solicitarCEP();
                    break;
                case '2':
                    await this.solicitarNumeroEndereco();
                    break;
                case '3':
                    await this.solicitarQtdeBlocos();
                    break;
                case '4':
                    await this.solicitarQtdeApartamentos();
                    break;
                case '5':
                    await this.solicitarNome();
                    break;
                case '6':
                    await this.solicitarEmail();
                    break;
                case '7':
                    await this.solicitarSindico();
                    break;
                case '8':
                    await this.solicitarTelefone();
                    break;
                case '9':
                    await this.solicitarBloco();
                    break;
                case '10':
                    await this.solicitarApartamento();
                    break;
                default:
                    await this.bot.sendMessage(this.chatId, "Opção inválida. Por favor, escolha uma opção válida.");
                    await this.alterarDadosCliente();
            }
        });
    }

    async solicitarCEP() {
        await this.bot.sendMessage(this.chatId, "Por favor, digite o novo CEP (formato XXXXX-XXX).");

        this.bot.once('message', async (msg) => {
            let cep = msg.text.trim();
            while (!/^\d{5}-\d{3}$/.test(cep)) {
                await this.bot.sendMessage(this.chatId, "CEP inválido. Por favor, digite o CEP novamente.");
                this.bot.once('message', async (msg) => {
                    cep = msg.text.trim();
                });
            }
            this.cliente.cep = cep;
            await this.confirmarAlteracao();
        });
    }

    async solicitarNumeroEndereco() {
        await this.bot.sendMessage(this.chatId, "Por favor, digite o novo número do endereço (máximo de 10 caracteres).");

        this.bot.once('message', async (msg) => {
            let numeroEndereco = msg.text.trim();
            while (!/^[a-zA-Z0-9]{1,10}$/.test(numeroEndereco)) {
                await this.bot.sendMessage(this.chatId, "Número de endereço inválido. Por favor, digite novamente.");
                this.bot.once('message', async (msg) => {
                    numeroEndereco = msg.text.trim();
                });
            }
            this.cliente.numeroDoEndereco = numeroEndereco;
            await this.confirmarAlteracao();
        });
    }

    async solicitarQtdeBlocos() {
        await this.bot.sendMessage(this.chatId, "Digite a nova quantidade de blocos no prédio.");

        this.bot.once('message', async (msg) => {
            let quantidadeBlocos = msg.text.trim();
            while (!/^\d+$/.test(quantidadeBlocos) || parseInt(quantidadeBlocos) <= 0) {
                await this.bot.sendMessage(this.chatId, "Quantidade inválida. Por favor, digite um número válido.");
                this.bot.once('message', async (msg) => {
                    quantidadeBlocos = msg.text.trim();
                });
            }
            this.cliente.qtdBlocos = parseInt(quantidadeBlocos);
            await this.confirmarAlteracao();
        });
    }

    async solicitarQtdeApartamentos() {
        await this.bot.sendMessage(this.chatId, "Digite a nova quantidade de apartamentos.");

        this.bot.once('message', async (msg) => {
            this.cliente.qtdApartamentos = parseInt(msg.text);
            await this.confirmarAlteracao();
        });
    }

    async solicitarNome() {
        await this.bot.sendMessage(this.chatId, "Digite o novo nome.");

        this.bot.once('message', async (msg) => {
            const nome = msg.text.trim();
            if (nome && nome.length > 0 && /^[a-zA-Z\s]+$/.test(nome)) {
                this.cliente.nome = nome;
                await this.confirmarAlteracao();
            } else {
                await this.bot.sendMessage(this.chatId, "Nome inválido. Por favor, digite um nome válido.");
                await this.solicitarNome();
            }
        });
    }

    async solicitarEmail() {
        await this.bot.sendMessage(this.chatId, "Digite o novo e-mail.");

        this.bot.once('message', async (msg) => {
            const email = msg.text.trim();
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (emailRegex.test(email)) {
                this.cliente.email = email;
                await this.confirmarAlteracao();
            } else {
                await this.bot.sendMessage(this.chatId, "E-mail inválido. Por favor, insira um e-mail válido.");
                await this.solicitarEmail();
            }
        });
    }

    async solicitarSindico() {
        await this.bot.sendMessage(this.chatId, "Você é síndico? Digite 1 para 'Sim' ou 2 para 'Não'.");

        this.bot.once('message', async (msg) => {
            const resposta = msg.text.trim();
            if (resposta === '1') {
                this.cliente.sindico = true;
            } else if (resposta === '2') {
                this.cliente.sindico = false;
            } else {
                await this.bot.sendMessage(this.chatId, "Opção inválida. Digite 1 para 'Sim' ou 2 para 'Não'.");
                await this.solicitarSindico();
            }
            await this.confirmarAlteracao();
        });
    }

    async solicitarTelefone() {
        await this.bot.sendMessage(this.chatId, "Digite o novo DDD (dois dígitos).");

        this.bot.once('message', async (msg) => {
            let ddd = msg.text.trim();
            while (!/^\d{2}$/.test(ddd)) {
                await this.bot.sendMessage(this.chatId, "DDD inválido. Digite novamente.");
                this.bot.once('message', async (msg) => {
                    ddd = msg.text.trim();
                });
            }

            await this.bot.sendMessage(this.chatId, "Digite o novo número de telefone (até 9 dígitos).");

            this.bot.once('message', async (msg) => {
                let numero = msg.text.trim();
                while (!/^\d{8,9}$/.test(numero)) {
                    await this.bot.sendMessage(this.chatId, "Número inválido. Digite novamente.");
                    this.bot.once('message', async (msg) => {
                        numero = msg.text.trim();
                    });
                }

                if (numero.length === 8) {
                    this.cliente.telefone = `(${ddd})${numero.slice(0, 4)}-${numero.slice(4)}`;
                } else {
                    this.cliente.telefone = `(${ddd})${numero.slice(0, 5)}-${numero.slice(5)}`;
                }

                await this.confirmarAlteracao();
            });
        });
    }

    async solicitarBloco() {
        await this.bot.sendMessage(this.chatId, "Digite o novo bloco.");

        this.bot.once('message', async (msg) => {
            this.cliente.bloco = msg.text.trim();
            await this.confirmarAlteracao();
        });
    }

    async solicitarApartamento() {
        await this.bot.sendMessage(this.chatId, "Digite o novo número do apartamento.");

        this.bot.once('message', async (msg) => {
            this.cliente.apartamento = msg.text.trim();
            await this.confirmarAlteracao();
        });
    }

    async confirmarAlteracao() {
        const dadosAlterados = `
        Nome: ${this.cliente.nome}
        E-mail: ${this.cliente.email}
        CEP: ${this.cliente.cep}
        Número do Endereço: ${this.cliente.numeroDoEndereco}
        Quantidade de Blocos: ${this.cliente.qtdBlocos}
        Quantidade de Apartamentos: ${this.cliente.qtdApartamentos}
        Síndico: ${this.cliente.sindico ? 'Sim' : 'Não'}
        Telefone: ${this.cliente.telefone}
        Bloco: ${this.cliente.bloco}
        Apartamento: ${this.cliente.apartamento}
        `;

        await this.bot.sendMessage(this.chatId, `Os dados alterados são:\n${dadosAlterados}\nConfirme se as alterações estão corretas: Digite 1 para confirmar ou 2 para alterar novamente.`);

        this.bot.once('message', async (msg) => {
            const confirmacao = msg.text.trim();
            if (confirmacao === '1') {
                await this.bot.sendMessage(this.chatId, "As alterações foram salvas.");
                // Aqui você pode salvar as alterações permanentemente em um banco de dados, por exemplo.
            } else {
                await this.alterarDadosCliente();
            }
        });
    }
}

module.exports = AlterarCadastro;
