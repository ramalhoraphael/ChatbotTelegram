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
        
         // Remove o listener 'message' anterior, se existir
         this.bot.removeAllListeners('message');
        
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
        await this.bot.sendMessage(this.chatId, "Você é síndico? Digite 1 para 'Sim' ou 2 para 'Não'.");
        
        // Remove listeners anteriores para evitar duplicação
        this.bot.removeAllListeners('message');
    
        this.bot.once('message', async (msg) => {
            const resposta = msg.text.trim();
            
            // Verifica se a resposta é válida (1 para sim, 2 para não)
            if (resposta === '1') {
                this.cliente.sindico = true;  // Síndico
                await this.solicitarQuantidadeApartamentos();
            } else if (resposta === '2') {
                this.cliente.sindico = false;  // Não síndico
                await this.solicitarQuantidadeApartamentos();
            } else {
                // Se a resposta for inválida, pede para o usuário digitar novamente
                await this.bot.sendMessage(this.chatId, "Opção inválida. Digite 1 para 'Sim' ou 2 para 'Não'.");
                await this.solicitarSindico();  // Reinicia a solicitação
            }
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
        // Solicita o DDD
        await this.bot.sendMessage(this.chatId, "Por favor, digite o DDD do seu telefone de contato (dois dígitos).");
        
        this.bot.once('message', async (msg) => {
            let ddd = msg.text.trim();
            
            // Verifica se o DDD contém apenas dois dígitos e são números
            while (!/^\d{2}$/.test(ddd)) {
                await this.bot.sendMessage(this.chatId, "DDD inválido. Por favor, digite o DDD (dois dígitos) novamente.");
                this.bot.once('message', async (msg) => {
                    ddd = msg.text.trim();
                });
            }
            
            // Solicita o número
            await this.bot.sendMessage(this.chatId, "Por favor, digite o número do seu telefone para contato (até 9 dígitos, sem espaços ou caracteres especiais).");
            
            this.bot.once('message', async (msg) => {
                let numero = msg.text.trim();
                
                // Verifica se o número contém apenas dígitos e tem entre 8 e 9 dígitos
                while (!/^\d{8,9}$/.test(numero)) {
                    await this.bot.sendMessage(this.chatId, "Número inválido. Por favor, digite o número novamente (apenas dígitos, até 9 dígitos).");
                    this.bot.once('message', async (msg) => {
                        numero = msg.text.trim();
                    });
                }
    
                // Armazena o telefone no formato (XX)XXXXX-XXXX ou (XX)XXXX-XXXX
                if (numero.length === 8) {
                    this.cliente.telefone = `(${ddd})${numero.slice(0, 4)}-${numero.slice(4)}`;
                } else {
                    this.cliente.telefone = `(${ddd})${numero.slice(0, 5)}-${numero.slice(5)}`;
                }
                
                // Prossegue com a solicitação do CEP
                await this.solicitarCEP();
            });
        });
    }

    async solicitarCEP() {
        await this.bot.sendMessage(this.chatId, "Por favor, digite seu CEP (formato XXXXX-XXX).");
        
        this.bot.once('message', async (msg) => {
            let cep = msg.text.trim();
            
            // Verifica se o CEP está no formato correto (5 números, hífen, 3 números)
            while (!/^\d{5}-\d{3}$/.test(cep)) {
                await this.bot.sendMessage(this.chatId, "CEP inválido. Por favor, digite o CEP novamente no formato XXXXX-XXX.");
                this.bot.once('message', async (msg) => {
                    cep = msg.text.trim();
                });
            }
    
            // Armazena o CEP
            this.cliente.cep = cep;
            
            // Pergunta se é um prédio de um único bloco ou com mais de um
            await this.solicitarNumeroResidencia();
        });
    }
    
    async solicitarNumeroResidencia() {
        await this.bot.sendMessage(this.chatId, "Por favor, digite o número do endereço (máximo de 10 caracteres, somente números e letras).");
    
        this.bot.once('message', async (msg) => {
            let numeroResidencia = msg.text.trim();
    
            // Verifica se o número da residência tem no máximo 10 caracteres e contém apenas letras e números
            while (!/^[a-zA-Z0-9]{1,10}$/.test(numeroResidencia)) {
                await this.bot.sendMessage(this.chatId, "Número de residência inválido. Por favor, digite novamente (máximo de 10 caracteres, apenas números e letras).");
                this.bot.once('message', async (msg) => {
                    numeroResidencia = msg.text.trim();
                });
            }
    
            // Armazena o número da residência utilizando o setter da classe Cliente
            this.cliente.numeroResidencia = numeroResidencia;
    
            // Prossegue com o próximo passo (se houver)
            await this.verificaBlocoUnitario();  // Por exemplo, confirmando o cadastro
        });
    }

    async verificaBlocoUnitario() {
        await this.bot.sendMessage(this.chatId, "O endereço é um prédio com apenas um bloco ou existem mais blocos?");
        await this.bot.sendMessage(this.chatId, "Digite '1' para um único bloco ou 'mais' para mais de um bloco.");
        
        this.bot.once('message', async (msg) => {
            let resposta = msg.text.trim().toLowerCase();
    
            if (resposta === '1') {
                // Se for um único bloco, já define o bloco como '1'
                this.cliente.bloco = '1';
                await this.solicitarBlocoApartamento();
            } else if (resposta === 'mais') {
                // Se for mais de um bloco, pergunta a quantidade
                await this.verificaConjuntoDeBlocos();
            } else {
                // Se a resposta não for válida, pede novamente
                await this.bot.sendMessage(this.chatId, "Resposta inválida. Digite '1' para um único bloco ou 'mais' para mais de um bloco.");
                await this.verificaBlocoUnitario();
            }
        });
    }
    
    async verificaConjuntoDeBlocos() {
        await this.bot.sendMessage(this.chatId, "Quantos blocos existem no prédio?");
        
        this.bot.once('message', async (msg) => {
            let quantidadeBlocos = msg.text.trim();
            
            // Verifica se a quantidade de blocos é um número válido
            while (!/^\d+$/.test(quantidadeBlocos) || parseInt(quantidadeBlocos) <= 0) {
                await this.bot.sendMessage(this.chatId, "Quantidade inválida. Por favor, digite um número válido de blocos.");
                this.bot.once('message', async (msg) => {
                    quantidadeBlocos = msg.text.trim();
                });
            }
    
            // Armazena a quantidade de blocos
            this.cliente.quantidadeBlocos = parseInt(quantidadeBlocos);
            
            // Prossegue com a solicitação do bloco
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
                await this.cadastrarCliente();  // Reinicia o cadastro
            } else {
                await this.bot.sendMessage(this.chatId, "Resposta inválida. Digite 1 para confirmar ou 2 para alterar.");
                await this.confirmarCadastro();  // Re-pede a confirmação
            }
        });
    }
    

    async finalizarCadastro() {
        // Remove o traço do CEP e concatena com o número da residência para gerar o ID do cliente
        const cepSemTraco = this.cliente.cep.replace('-', '');
        const idGerado = `${cepSemTraco}${this.cliente.numeroResidencia}`;
    
        // Define o idCliente na instância de cliente
        this.cliente.idCliente = idGerado;
    
        const coleta = this.definirColeta();
    
        // Mensagem informando que o cadastro foi finalizado e o ID foi gerado
        await this.bot.sendMessage(this.chatId, `Cadastro completo. Seu ID foi gerado e a coleta será realizada ${coleta}.`);
        await this.bot.sendMessage(this.chatId, `Seu número de ID é: ${this.cliente.idCliente}`);
    }
    
    

    definirColeta() {
        const qtd = this.cliente.qtdApartamentos;
        if (qtd <= 10) return "uma vez por semana";
        if (qtd <= 20) return "duas vezes por semana";
        return "de segunda a sexta-feira";
    }
}

module.exports = Cadastrar;
