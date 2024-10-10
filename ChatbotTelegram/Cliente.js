class Cliente {
  constructor() {
    this._nome = "";
    this._email = "";
    this._telefone = "";
    this._endereco = "";
    this._apartamento = "";
    this._bloco = "";
    this._sindico = false;
    this._qtdApartamentos = 0;
  }

  get nome() {
    return this._nome;
  }

  set nome(valor) {
    if (typeof valor === "string" && valor.trim() !== "") {
      this._nome = valor;
    }
  }

  get email() {
    return this._email;
  }

  set email(valor) {
    this._email = valor;
  }

  get telefone() {
    return this._telefone;
  }

  set telefone(valor) {
    this._telefone = valor;
  }

  get endereco() {
    return this._endereco;
  }

  set endereco(valor) {
    this._endereco = valor;
  }

  get apartamento() {
    return this._apartamento;
  }

  set apartamento(valor) {
    this._apartamento = valor;
  }

  get bloco() {
    return this._bloco;
  }

  set bloco(valor) {
    this._bloco = valor;
  }

  get sindico() {
    return this._sindico;
  }

  set sindico(valor) {
    this._sindico = valor;
  }

  get qtdApartamentos() {
    return this._qtdApartamentos;
  }

  set qtdApartamentos(valor) {
    this._qtdApartamentos = valor;
  }

  toString() {
    return `
      Nome: ${this._nome}
      E-mail: ${this._email}
      Telefone: ${this._telefone}
      Endereço: ${this._endereco}
      Apartamento: ${this._apartamento}
      Bloco: ${this._bloco}
      Síndico: ${this._sindico ? 'Sim' : 'Não'}
      Quantidade de Apartamentos: ${this._qtdApartamentos}
    `;
  }
}

module.exports = Cliente;
