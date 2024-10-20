class Cliente {
  constructor() {
    this._cep = null;  // 1. CEP continua
    this._numeroDoEndereco = null;  // 2. Nº END alterado para numeroDoEndereco
    this._qtdBlocos = null;  // 3. QTDE BLOCOS adicionada
    this._qtdApartamentos = null;  // 4. QTDE DE APARTAMENTOS continua
    this._nome = null;  // 5. NOME continua
    this._email = null;  // 6. EMAIL continua
    this._sindico = null;  // 7. SINDICO continua
    this._telefone = null;  // 8. TELEFONE continua
    this._bloco = null;  // 9. BLOCO continua
    this._apartamento = null;  // 10. APARTAMENTO continua
    this._idCliente = null;  // ID do Cliente mantido
    this._qtdColetas = null;
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

  get qtdColetas() {
    return this._qtdColetas;
  }

  set qtdColetas(valor) {
    this._qtdColetas = valor;
  }

  toString() {
    return `CEP: ${this._cep}
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
      Quantidade de Coletas: ${this._qtdColetas}

    `;
  }
}

module.exports = Cliente;
