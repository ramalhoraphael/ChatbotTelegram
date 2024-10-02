class Cliente {
  constructor(
    nome,
    endereco,
    apartamento,
    bloco,
    telefone,
    sindico,
    email,
    qtdApartamentos,
  ) {
    this.nome = nome;
    this.endereco = endereco;
    this.apartamento = apartamento;
    this.bloco = bloco;
    this.telefone = telefone;
    this.sindico = sindico;
    this.email = email;
    this.qtdApartamentos = qtdApartamentos;
  }

  static fromString(dados) {
    const [
      nome,
      endereco,
      apartamento,
      bloco,
      telefone,
      sindico,
      email,
      qtdApartamentos,
    ] = dados.split(";");
    return new Cliente(
      nome,
      endereco,
      apartamento,
      bloco,
      telefone,
      sindico === "true",
      email,
      parseInt(qtdApartamentos, 10),
    );
  }

  toString() {
    return `${this.nome} - Endereço: ${this.endereco}, Apto: ${this.apartamento}, Bloco: ${this.bloco}, Telefone: ${this.telefone}, Síndico: ${this.sindico}, Email: ${this.email}, Quantidade de Apartamentos: ${this.qtdApartamentos}`;
  }
}

module.exports = Cliente;
