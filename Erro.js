class Erro {
  static exibirErro(mensagem) {
    console.error(`Erro: ${mensagem}`);
  }

  static exibirConfirmacao(mensagem) {
    console.log(`Confirmação: ${mensagem}`);
  }
}

module.exports = Erro;
