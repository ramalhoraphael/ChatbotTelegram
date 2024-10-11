class Cliente {
  constructor() {
    this._cep = "";  // 1. CEP continua
    this._numeroDoEndereco = "";  // 2. Nº END alterado para numeroDoEndereco
    this._qtdBlocos = 0;  // 3. QTDE BLOCOS adicionada
    this._qtdApartamentos = 0;  // 4. QTDE DE APARTAMENTOS continua
    this._nome = "";  // 5. NOME continua
    this._email = "";  // 6. EMAIL continua
    this._sindico = false;  // 7. SINDICO continua
    this._telefone = "";  // 8. TELEFONE continua
    this._bloco = "";  // 9. BLOCO continua
    this._apartamento = "";  // 10. APARTAMENTO continua
    this._idCliente = "";  // ID do Cliente mantido
  }

  // Getters e setters na nova ordem
  get cep() {
    return this._cep;
  }

  set cep(valor) {
    this._cep = valor;
  }

  get numeroDoEndereco() {
    return this._numeroDoEndereco;
  }

  set numeroDoEndereco(valor) {
    this._numeroDoEndereco = valor;
  }

  get qtdBlocos() {
    return this._qtdBlocos;
  }

  set qtdBlocos(valor) {
    this._qtdBlocos = valor;
  }

  get qtdApartamentos() {
    return this._qtdApartamentos;
  }

  set qtdApartamentos(valor) {
    this._qtdApartamentos = valor;
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

  get sindico() {
    return this._sindico;
  }

  set sindico(valor) {
    this._sindico = valor;
  }

  get telefone() {
    return this._telefone;
  }

  set telefone(valor) {
    this._telefone = valor;
  }

  get bloco() {
    return this._bloco;
  }

  set bloco(valor) {
    this._bloco = valor;
  }

  get apartamento() {
    return this._apartamento;
  }

  set apartamento(valor) {
    this._apartamento = valor;
  }

  get idCliente() {
    return this._idCliente;
  }

  set idCliente(valor) {
    this._idCliente = valor;
  }

  toString() {
    return `
      CEP: ${this._cep}
      Nº do Endereço: ${this._numeroDoEndereco}
      Quantidade de Blocos: ${this._qtdBlocos}
      Quantidade de Apartamentos: ${this._qtdApartamentos}
      Nome: ${this._nome}
      E-mail: ${this._email}
      Síndico: ${this._sindico ? 'Sim' : 'Não'}
      Telefone: ${this._telefone}
      Bloco: ${this._bloco}
      Apartamento: ${this._apartamento}
      ID do Cliente: ${this._idCliente}
    `;
  }
}

module.exports = Cliente;
