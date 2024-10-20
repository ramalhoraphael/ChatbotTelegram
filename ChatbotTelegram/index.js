require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const Cliente = require("./Cliente");

// Configurando o bot com token em arquivo protegido
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: {
    interval: 1000,
    retries: 3,
    params: { timeout: 10 },
  },
});

let userState = {};

console.log("userState: ",userState);

const cliente = new Cliente();

bot.on("message", (msg) => {
  console.log("***********************************************************");
  console.log("bot.on sendo carregado")
  console.log("userState[msg.chat.id]: ",userState[msg.chat.id]);

  //iniciar e menu
  if (userState[msg.chat.id] === undefined || userState[msg.chat.id] === 'recomecando' ){
    console.log("primeiro if carregado"); 
    //const chatId = msg.chat.id;
    //console.log("Numero da conversa: ", chatId);
    //const usuarioId = msg.from;
    //console.log("Numero da conversa: ", usuarioId);
    console.log("Iniciando uma nova conversa...");
    iniciar(msg);
    menu(msg);
    userState[msg.chat.id] = 'aguardando_menu';
  }
  if (userState[msg.chat.id] === 'aguardando_menu'){
      console.log("segundo if carregado");
      console.log("¨¨¨¨¨¨¨¨");
      let resposta = msg.text;
      switch (resposta) {
        case "1":
          console.log("case 1 ok");
          userState[msg.chat.id] = 'iniciando_cadastro';
          break;
        case "2":
          console.log("case 2 ok");
          paginaWeb(msg);
          
          userState[msg.chat.id] = undefined;
          //finalizar(msg);
          break;
        case "3":
          console.log("case 3 ok");
          finalizar(msg);
          userState[msg.chat.id] = undefined; 
          break;
      }//fim_switch
    }//fim_if
      if (userState[msg.chat.id] === 'iniciando_cadastro'){
        console.log("cadastro pronto para comecar");
        console.log(cliente.cep);
        userState[msg.chat.id] = 'pedindo_cep';
      }

      //cep
      
      if (userState[msg.chat.id] === 'cadastrando_cep' && /*/^\d+$/.test(msg.text) &&*/ msg.text !=='1'){
        let resposta = msg.text;
        cliente.cep = resposta;
        console.log("cep cadastrado:");
        console.log(cliente.cep);
        userState[msg.chat.id] = 'pedindo_numeroDoEndereco';
      }
      if (userState[msg.chat.id] === 'pedindo_cep'){
        digiteCep(msg);
        userState[msg.chat.id] = 'cadastrando_cep';
      }
      
      //numeroDoEndereco  
      if (userState[msg.chat.id] === 'cadastrando_numeroDoEndereco' && msg.text.length <= 10){
        let resposta = msg.text;
        cliente.numeroDoEndereco = resposta;
        console.log("numero do endereco cadastrado:");
        console.log(cliente.numeroDoEndereco);
        userState[msg.chat.id] = 'pedindo_qtdBlocos';
      }
      if (userState[msg.chat.id] === 'pedindo_numeroDoEndereco'){
        digiteNumeroDoEndereco(msg);
        userState[msg.chat.id] = 'cadastrando_numeroDoEndereco';
      }
     
      //qtdBlocos
      if (userState[msg.chat.id] === 'cadastrando_qtdBlocos' && msg.text.length <= 5){
        let resposta = msg.text;
        cliente.qtdBlocos = resposta;
        console.log("Quantidade de blocos cadastrada: ");
        console.log(cliente.qtdBlocos);
        userState[msg.chat.id] = 'pedindo_qtdApartamentos';
      }  
      if (userState[msg.chat.id] === 'pedindo_qtdBlocos'){
        digiteQtdeBlocos(msg);
        userState[msg.chat.id] = 'cadastrando_qtdBlocos'
      }

      //qtdApartamentos
      if (userState[msg.chat.id] === 'cadastrando_qtdApartamentos' && msg.text.length <= 5){
        let resposta = msg.text;
        cliente.qtdApartamentos = resposta;
        console.log("Quantidade de apartamentos cadastrada: ");
        console.log(cliente.qtdApartamentos)
        userState[msg.chat.id] = 'pedindo_nome';
      }
      if (userState[msg.chat.id] === 'pedindo_qtdApartamentos'){
        digiteQtdeApartamentos(msg);
        userState[msg.chat.id] = 'cadastrando_qtdApartamentos'
      }

      //nome
      if (userState[msg.chat.id] === 'cadastrando_nome' && msg.text.length <= 30){
        let resposta = msg.text;
        cliente.nome = resposta;
        console.log("Nome cadastrado: ");
        console.log(cliente.nome)
        userState[msg.chat.id] = 'pedindo_email';
      }
      if (userState[msg.chat.id] === 'pedindo_nome'){
        digiteNome(msg);
        userState[msg.chat.id] = 'cadastrando_nome'
      }

      //email
      if (userState[msg.chat.id] === 'cadastrando_email' && msg.text.length <= 30){
        let resposta = msg.text;
        cliente.email = resposta;
        console.log("Email cadastrado: ");
        console.log(cliente.email)
        userState[msg.chat.id] = 'pedindo_sindico';
      }
      if (userState[msg.chat.id] === 'pedindo_email'){
        digiteEmail(msg);
        userState[msg.chat.id] = 'cadastrando_email'
      }

      //sindico
      if (userState[msg.chat.id] === 'cadastrando_sindico' && msg.text.length <= 30){
        let resposta = msg.text;
        if (resposta === "1"){
        cliente.sindico = "sim";
        console.log("Sindico cadastrado: ");
        }
        if (resposta === "2"){
          cliente.sindico = "nao";
          console.log("Sindico cadastrado: ");
        }
        console.log(cliente.sindico)
        userState[msg.chat.id] = 'pedindo_telefone';
      }
      if (userState[msg.chat.id] === 'pedindo_sindico'){
        digiteSindico(msg);
        userState[msg.chat.id] = 'cadastrando_sindico';
      }

      //telefone
      if (userState[msg.chat.id] === 'cadastrando_telefone' && msg.text.length <= 15){
        let resposta = msg.text;
        cliente.telefone = resposta;
        console.log("Telefone cadastrado: ");
        console.log(cliente.telefone)
        userState[msg.chat.id] = 'pedindo_bloco';
      }
      if (userState[msg.chat.id] === 'pedindo_telefone'){
        digiteTelefone(msg);
        userState[msg.chat.id] = 'cadastrando_telefone';
      }

      //bloco
      if (userState[msg.chat.id] === 'cadastrando_bloco' && msg.text.length <= 30){
        let resposta = msg.text;
        cliente.bloco = resposta;
        console.log("Bloco: ");
        console.log(cliente.bloco);
        userState[msg.chat.id] = 'pedindo_apartamento';
      }
      if (userState[msg.chat.id] === 'pedindo_bloco'){
        digiteBloco(msg);
        userState[msg.chat.id] = 'cadastrando_bloco';
      }

      //apartamento
      if (userState[msg.chat.id] === 'cadastrando_apartamento' && msg.text.length <= 5){
        let resposta = msg.text;
        cliente.apartamento = resposta;
        console.log("Apartamento cadastrado: ");
        console.log(cliente.apartamento);
        userState[msg.chat.id] = 'gerando_idCliente';
      }
      if (userState[msg.chat.id] === 'pedindo_apartamento'){
        digiteApartamento(msg);
        userState[msg.chat.id] = 'cadastrando_apartamento';
      }

      //gerar ID
      if (userState[msg.chat.id] === 'gerando_idCliente'){
        cliente.idCliente = cliente.numeroDoEndereco + cliente.cep;
        console.log("IdCliente gerado: ");
        console.log(cliente.idCliente);
        userState[msg.chat.id] = 'gerando_qtdColetas';
      }  

      //quantidade de coletas
      if (userState[msg.chat.id] === 'gerando_qtdColetas'){
        if(cliente.qtdApartamentos <=10){
          cliente.qtdColetas = "Coleta 1x por semana"
        }
        if(cliente.qtdApartamentos <=20){
          cliente.qtdColetas = "Coleta2x por semana"
        }
        if(cliente.qtdApartamentos <=30){
          cliente.qtdColetas = "Coleta 3x por semana"
        }
        if(cliente.qtdApartamentos <=40){
          cliente.qtdColetas = "Coleta de Segunda a Sexta"
        }
        userState[msg.chat.id] = 'mostrar_cadastro';
      } 

      //mostrar cadastro
      if (userState[msg.chat.id] === 'mostrar_cadastro'){
        console.log("mostrar cadastro: ", cliente);
        mostrarCadastro(msg);
        userState[msg.chat.id] = 'recomecando'; 
      }
    
});//fim bot.on

// fim da logica, logo após printar os dados do cadastro 
console.log("Bot iniciado e aguardando mensagens...");

// Funções para logar erros
bot.on("polling_error", (error) => console.log("Polling Error:", error));
bot.on("webhook_error", (error) => console.log("Webhook Error:", error));
bot.on("error", (error) => console.log("Erro Geral:", error));

//########################################################################

function iniciar (msg){
  bot.sendMessage(msg.chat.id, "Bem-vindo ao Chat Geral - " +
    "Cadastro de Condomínios para coleta seletiva");
}

function menu(msg){
  bot.sendMessage(msg.chat.id, `Escolha uma das opções abaixo:\n\n1. Para se cadastrar\n2. Acessar página web do ChatGeral\n3. Sair`);
}

function finalizar(msg){
  bot.sendMessage(msg.chat.id, `Encerrando conversa. Até breve!`);
}

function paginaWeb(msg){
  bot.sendMessage(msg.chat.id, `Acesse em www.chatgeralcoletaseletiva.org`);
}

function digiteCep(msg){
  bot.sendMessage(msg.chat.id, `Digite o CEP (somente os numeros)`);
}
function digiteNumeroDoEndereco(msg){
  bot.sendMessage(msg.chat.id, `Digite o numero do endereco`);
}
function digiteQtdeBlocos(msg){
  bot.sendMessage(msg.chat.id, `Digite a quantidade de blocos`);
}
function digiteQtdeApartamentos(msg){
  bot.sendMessage(msg.chat.id, `Digite a quantidade de Apartamentos`);
}
function digiteNome(msg){
  bot.sendMessage(msg.chat.id, `Digite seu nome`);
}
function digiteEmail(msg){
  bot.sendMessage(msg.chat.id, `Digite o e-mail`);
}
function digiteSindico(msg){
  bot.sendMessage(msg.chat.id, `Voce é o síndico? (1)Sim ou (2)Não`);
}
function digiteTelefone(msg){
  bot.sendMessage(msg.chat.id, `Digite seu telefone`);
}
function digiteBloco(msg){
  bot.sendMessage(msg.chat.id, `Digite o numero do seu bloco`);
}
function digiteApartamento(msg){
  bot.sendMessage(msg.chat.id, `Digite o numero do seu apartamento`);
}
function mostrarCadastro(msg) {
  // Formatando o objeto cliente para uma string legível
  bot.sendMessage(msg.chat.id, cliente.toString());
  paginaWeb(msg);
  bot.sendMessage(msg.chat.id, "Muito obrigado pelo seu cadastro e participação");
  bot.sendMessage(msg.chat.id, "Até a próxima!");
}
