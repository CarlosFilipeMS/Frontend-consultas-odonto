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
      setNome('');
      setCpf('');
      setDataNascimento('');
      setTelefone('');
    } else {
      alert('Erro ao cadastrar paciente');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 home-container">
      <div className="card shadow-lg p-4 text-center">
        <h2 className="mb-4">Cadastrar Paciente</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">CPF</label>
            <input
              type="text"
              className="form-control"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="CPF"
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Data de Nascimento</label>
            <input
              type="date"
              className="form-control"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Telefone</label>
            <input
              type="text"
              className="form-control"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Telefone"
              required
            />
          </div>
          <button type="submit" className="btn custom-btn btn-primary w-100">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroPaciente;
