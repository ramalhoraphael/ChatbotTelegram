class Cliente {
  constructor() {
    this._nome = "";
    this._email = "";
    this._telefone = "";
    this._cep = "";  // Alterado de _endereco para _cep
    this._numeroResidencia = "";  // Novo atributo para número da residência
    this._apartamento = "";
    this._bloco = "";
    this._sindico = false;
    this._qtdApartamentos = 0;
    this._idCliente = "";  // Novo atributo para ID do cliente
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

  get cep() {
    return this._cep;
  }

  set cep(valor) {
    this._cep = valor;
  }

  get numeroResidencia() {
    return this._numeroResidencia;
  }

  set numeroResidencia(valor) {
    this._numeroResidencia = valor;
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

  // Novo getter e setter para idCliente
  get idCliente() {
    return this._idCliente;
  }

  set idCliente(valor) {
    this._idCliente = valor;
  }

  toString() {
    return `
      Nome: ${this._nome}
      E-mail: ${this._email}
      Telefone: ${this._telefone}
      CEP: ${this._cep}
      Número da Residência: ${this._numeroResidencia}
      Apartamento: ${this._apartamento}
      Bloco: ${this._bloco}
      Síndico: ${this._sindico ? 'Sim' : 'Não'}
      Quantidade de Apartamentos: ${this._qtdApartamentos}
      ID do Cliente: ${this._idCliente}
    `;
  }
}

module.exports = Cliente;
