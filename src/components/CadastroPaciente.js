import React, { useState } from 'react';

function CadastroPaciente() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8080/pacientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nome,
        cpf: cpf,
        dataNascimento: dataNascimento,
        telefone: telefone,
      }),
    });

    if (response.ok) {
      alert('Paciente cadastrado com sucesso!');
    } else {
      alert('Erro ao cadastrar paciente');
    }
  };

  return (
    <div className="container">
      <h2>Cadastrar Paciente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">CPF</label>
          <input
            type="text"
            className="form-control"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="CPF"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Data de Nascimento</label>
          <input
            type="date"
            className="form-control"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Telefone</label>
          <input
            type="text"
            className="form-control"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Telefone"
          />
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroPaciente;
