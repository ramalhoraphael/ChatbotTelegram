const Cliente = require('./Cliente');

class Cadastrar {
    constructor(bot, chatId, conversacao) {
        this.bot = bot;
        this.chatId = chatId;
        this.conversacao = conversacao;
        this.cliente = new Cliente();
    }

    async cadastrarCliente() {
        await this.solicitarCEP();
    }

    async solicitarCEP() {
        await this.bot.sendMessage(this.chatId, "Por favor, digite seu CEP (apenas números, 8 dígitos).");
    
        let cepValido = false;
    
        while (!cepValido) {
            const msg = await new Promise((resolve) => {
                this.bot.once('message', resolve);  // Espera apenas uma mensagem
            });
    
            let cep = msg.text.trim();  // Recebe o texto da mensagem
    
            // Verifica se o CEP tem exatamente 8 dígitos numéricos
            if (/^\d{8}$/.test(cep)) {
                this.cliente.cep = cep;  // Armazena o CEP
                cepValido = true;  // Sai do loop se o CEP for válido
            } else {
                await this.bot.sendMessage(this.chatId, "CEP inválido. Por favor, digite o CEP novamente (apenas números, 8 dígitos).");
            }
        }
    
        await this.solicitarNumeroEndereco();  // Prossegue para a próxima etapa
    }
    
    
    

    async solicitarNumeroEndereco() {
        await this.bot.sendMessage(this.chatId, "Por favor, digite o número do endereço, incluindo complemento se houver (máximo de 10 caracteres).");
    
        let numeroValido = false;
    
        while (!numeroValido) {
            const msg = await new Promise((resolve) => {
                this.bot.once('message', resolve);  // Espera uma única mensagem do usuário
            });
    
            let numeroEndereco = msg.text.trim();
    
            // Verifica se o número do endereço tem até 10 caracteres (qualquer caractere)
            if (numeroEndereco.length <= 10) {
                this.cliente.numeroDoEndereco = numeroEndereco;  // Armazena o número do endereço com complemento
                numeroValido = true;  // Sai do loop se o número for válido
            } else {
                await this.bot.sendMessage(this.chatId, "Número de endereço inválido. Por favor, digite o número do endereço (máximo de 10 caracteres, incluindo complemento se houver).");
            }
        }
    
        await this.solicitarQtdeBlocos();  // Prossegue para a próxima etapa
    }
    
    
    

    async solicitarQtdeBlocos() {
        await this.bot.sendMessage(this.chatId, "Quantos blocos existem no prédio? (Máximo de 100 blocos)");
    
        let quantidadeValida = false;
    
        while (!quantidadeValida) {
            const msg = await new Promise((resolve) => {
                this.bot.once('message', resolve);  // Aguarda uma única mensagem do usuário
            });
    
            let quantidadeBlocos = msg.text.trim();
    
            // Verifica se a quantidade de blocos é um número inteiro positivo e menor ou igual a 100
            if (/^\d+$/.test(quantidadeBlocos) && parseInt(quantidadeBlocos) > 0 && parseInt(quantidadeBlocos) <= 100) {
                this.cliente.qtdBlocos = parseInt(quantidadeBlocos);  // Armazena a quantidade de blocos
                quantidadeValida = true;  // Sai do loop se a quantidade for válida
            } else {
                await this.bot.sendMessage(this.chatId, "Quantidade inválida. Quantos blocos existem no prédio? (1 a 100).");
            }
        }
    
        await this.solicitarQtdeApartamentos();  // Prossegue para a próxima etapa
    }
    
    

    async solicitarQtdeApartamentos() {
        await this.bot.sendMessage(this.chatId, "Quantos apartamentos existem no condomínio? (Até 1000)");
    
        let quantidadeValida = false;
        let quantidadeApartamentos = 0;
    
        while (!quantidadeValida) {
            const msg = await new Promise((resolve) => {
                this.bot.once('message', resolve);  // Espera uma única mensagem do usuário
            });
    
            quantidadeApartamentos = msg.text.trim();
    
            // Verifica se a quantidade é um número válido e está entre 1 e 1000
            if (/^\d+$/.test(quantidadeApartamentos) && parseInt(quantidadeApartamentos) > 0 && parseInt(quantidadeApartamentos) <= 1000) {
                this.cliente.qtdApartamentos = parseInt(quantidadeApartamentos);  // Armazena a quantidade de apartamentos
                quantidadeValida = true;  // Sai do loop se a quantidade for válida
            } else {
                await this.bot.sendMessage(this.chatId, "Quantidade inválida. Por favor, digite um número válido (até 1000).");
            }
        }
    
        await this.solicitarNome();  // Prossegue para a próxima etapa
    }
    

    async solicitarNome() {
        await this.bot.sendMessage(this.chatId, "Por favor, digite seu nome.");

        this.bot.once('message', async (msg) => {
            const nome = msg.text.trim();
            if (nome && nome.length > 0 && /^[a-zA-Z\s]+$/.test(nome)) {
                this.cliente.nome = nome;
                await this.solicitarEmail();
            } else {
                await this.bot.sendMessage(this.chatId, "Nome inválido. Por favor, digite um nome válido.");
                await this.solicitarNome();
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
        await this.bot.sendMessage(this.chatId, "Você é síndico? Digite 1 para 'Sim' ou 2 para 'Não'.");

        this.bot.once('message', async (msg) => {
            const resposta = msg.text.trim();
            if (resposta === '1') {
                this.cliente.sindico = true;
                await this.solicitarTelefone();
            } else if (resposta === '2') {
                this.cliente.sindico = false;
                await this.solicitarTelefone();
            } else {
                await this.bot.sendMessage(this.chatId, "Opção inválida.");
                await this.solicitarSindico();
            }
        });
    }

    async solicitarTelefone() {
        await this.bot.sendMessage(this.chatId, "Por favor, digite o DDD do seu telefone de contato (dois dígitos).");
    
        let dddValido = false;
        let ddd = '';
    
        while (!dddValido) {
            const msg = await new Promise((resolve) => {
                this.bot.once('message', resolve);  // Espera uma única mensagem do usuário
            });
    
            ddd = msg.text.trim();
    
            // Verifica se o DDD tem exatamente 2 dígitos
            if (/^\d{2}$/.test(ddd)) {
                dddValido = true;
            } else {
                await this.bot.sendMessage(this.chatId, "DDD inválido. Por favor, digite o DDD (dois dígitos) novamente.");
            }
        }
    
        // Agora, solicita o número do telefone
        await this.bot.sendMessage(this.chatId, "Por favor, digite o número do seu telefone para contato (até 9 dígitos).");
    
        let numeroValido = false;
        let numero = '';
    
        while (!numeroValido) {
            const msg = await new Promise((resolve) => {
                this.bot.once('message', resolve);  // Espera uma única mensagem do usuário
            });
    
            numero = msg.text.trim();
    
            // Verifica se o número do telefone tem 8 ou 9 dígitos
            if (/^\d{8,9}$/.test(numero)) {
                numeroValido = true;
            } else {
                await this.bot.sendMessage(this.chatId, "Número inválido. Por favor, digite o número do seu telefone para contato (até 9 dígitos).");
            }
        }
    
        // Formata o telefone com DDD
        if (numero.length === 8) {
            this.cliente.telefone = `(${ddd})${numero.slice(0, 4)}-${numero.slice(4)}`;
        } else {
            this.cliente.telefone = `(${ddd})${numero.slice(0, 5)}-${numero.slice(5)}`;
        }
    
        await this.solicitarBloco();  // Prossegue para a próxima etapa
    }
    

    async solicitarBloco() {
        await this.bot.sendMessage(this.chatId, "Qual o bloco do seu apartamento? (Máximo de 3 caracteres)");
    
        let blocoValido = false;
        let bloco = "";
    
        while (!blocoValido) {
            const msg = await new Promise((resolve) => {
                this.bot.once('message', resolve);  // Espera uma única mensagem do usuário
            });
    
            bloco = msg.text.trim();
    
            // Verifica se o bloco tem exatamente 1 a 3 caracteres alfanuméricos
            if (/^[a-zA-Z0-9]{1,3}$/.test(bloco)) {
                this.cliente.bloco = bloco;  // Armazena o bloco
                blocoValido = true;  // Sai do loop se o bloco for válido
            } else {
                await this.bot.sendMessage(this.chatId, "Bloco inválido. Por favor, digite o bloco novamente (máximo de 3 caracteres).");
            }
        }
    
        await this.solicitarApartamento();  // Prossegue para a próxima etapa
    }
    

    async solicitarApartamento() {
        await this.bot.sendMessage(this.chatId, "Por favor, digite o número do seu apartamento.");

        this.bot.once('message', async (msg) => {
            this.cliente.apartamento = msg.text;
            await this.confirmarCadastro();
        });
    }

    async confirmarCadastro() {
        const dadosCliente = `
        CEP: ${this.cliente.cep}
        Nº do Endereço: ${this.cliente.numeroDoEndereco}
        Quantidade de Blocos: ${this.cliente.qtdBlocos}
        Quantidade de Apartamentos: ${this.cliente.qtdApartamentos}
        Nome: ${this.cliente.nome}
        E-mail: ${this.cliente.email}
        Síndico: ${this.cliente.sindico ? 'Sim' : 'Não'}
        Telefone: ${this.cliente.telefone}
        Bloco: ${this.cliente.bloco}
        Apartamento: ${this.cliente.apartamento}
        `;

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
                await this.confirmarCadastro();
            }
        });
    }

    async finalizarCadastro() {
        const cepSemTraco = this.cliente.cep.replace('-', '');
        const idGerado = `${cepSemTraco}${this.cliente.numeroDoEndereco}`;

        this.cliente.idCliente = idGerado;
        const coleta = this.definirColeta();

        await this.bot.sendMessage(this.chatId, `Cadastro completo. Seu ID foi gerado e a coleta será realizada ${coleta}.`);
        await this.bot.sendMessage(this.chatId, `Seu número de ID é: ${this.cliente.idCliente}`);
        await this.conversacao.menuOpcoes(); 
    }

    definirColeta() {
        const qtd = this.cliente.qtdApartamentos;
        if (qtd <= 10) return "uma vez por semana";
        if (qtd <= 20) return "duas vezes por semana";
        return "diariamente";
    }
}

module.exports = Cadastrar;
