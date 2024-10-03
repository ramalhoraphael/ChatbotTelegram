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

  // Getter e Setter para nome
  get nome() {
    return this._nome;
  }

  set nome(valor) {
    if (typeof valor === "string" && valor.trim() !== "") {
      this._nome = valor;
    } else {
      console.log("Nome inválido. Por favor, insira um nome válido.");
    }
  }

  // Getter e Setter para email
  get email() {
    return this._email;
  }

  set email(valor) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (emailRegex.test(valor)) {
      this._email = valor;
    } else {
      console.log("E-mail inválido. Por favor, insira um e-mail válido.");
    }
  }

  // Getter e Setter para telefone
  get telefone() {
    return this._telefone;
  }

  set telefone(valor) {
    const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (telefoneRegex.test(valor)) {
      this._telefone = valor;
    } else {
      console.log("Telefone inválido. Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.");
    }
  }

  // Getter e Setter para endereço
  get endereco() {
    return this._endereco;
  }

  set endereco(valor) {
    if (typeof valor === "string" && valor.trim() !== "") {
      this._endereco = valor;
    } else {
      console.log("Endereço inválido. Por favor, insira um endereço válido.");
    }
  }

  // Getter e Setter para apartamento
  get apartamento() {
    return this._apartamento;
  }

  set apartamento(valor) {
    if (typeof valor === "string" && valor.trim() !== "") {
      this._apartamento = valor;
    } else {
      console.log("Número do apartamento inválido. Por favor, insira um número válido.");
    }
  }

  // Getter e Setter para bloco
  get bloco() {
    return this._bloco;
  }

  set bloco(valor) {
    if (typeof valor === "string" && valor.trim() !== "") {
      this._bloco = valor;
    } else {
      console.log("Bloco inválido. Por favor, insira um bloco válido.");
    }
  }

  // Getter e Setter para sindico
  get sindico() {
    return this._sindico;
  }

  set sindico(valor) {
    if (typeof valor === "boolean") {
      this._sindico = valor;
    } else {
      console.log("Valor do síndico inválido. Por favor, insira 'true' ou 'false'.");
    }
  }

  // Getter e Setter para qtdApartamentos
  get qtdApartamentos() {
    return this._qtdApartamentos;
  }

  set qtdApartamentos(valor) {
    if (Number.isInteger(valor) && valor > 0) {
      this._qtdApartamentos = valor;
    } else {
      console.log("Quantidade de apartamentos inválida. Por favor, insira um número válido.");
    }
  }

  // Método toString
  toString() {
    return `${this.nome} - Endereço: ${this.endereco}, Apto: ${this.apartamento}, Bloco: ${this.bloco}, Telefone: ${this.telefone}, Síndico: ${this.sindico}, Email: ${this.email}, Quantidade de Apartamentos: ${this.qtdApartamentos}`;
  }
}

module.exports = Cliente;
