import React, { useState, useEffect } from 'react';

function MarcarConsulta() {
  const [pacienteCpf, setPacienteCpf] = useState('');
  const [pacienteNome, setPacienteNome] = useState('');
  const [dentistas, setDentistas] = useState([]);
  const [dentistaId, setDentistaId] = useState('');
  const [dentistaNome, setDentistaNome] = useState('');
  const [dataHora, setDataHora] = useState('');

  useEffect(() => {
    async function fetchDentistas() {
      try {
        const response = await fetch('https://web-production-e39ab.up.railway.app/dentistas');
        const data = await response.json();
        setDentistas(data);
      } catch (error) {
        console.error('Erro ao buscar dentistas:', error);
      }
    }
    fetchDentistas();
  }, []);

  // Busca paciente por CPF e atualiza o estado corretamente
  const buscarPacientePorCpf = async (cpf) => {
    if (cpf.length === 11) {
      try {
        const response = await fetch(`https://web-production-e39ab.up.railway.app/pacientes`);
        const data = await response.json();
  
        console.log("Resposta da API:", data); // Debug: Verificar a resposta
  
        // Filtra o paciente pelo CPF digitado
        const pacienteEncontrado = data.find(paciente => paciente.cpf === cpf);
  
        if (pacienteEncontrado) {
          setPacienteNome(pacienteEncontrado.nome); // Atualiza o nome corretamente
        } else {
          setPacienteNome(''); // Limpa o campo se não encontrar paciente
          alert('Paciente não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar paciente:', error);
        setPacienteNome('');
      }
    } else {
      setPacienteNome('');
    }
  };
  

  const handleCpfChange = (e) => {
    const cpf = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    setPacienteCpf(cpf);
    if (cpf.length === 11) {
      buscarPacientePorCpf(cpf);
    } else {
      setPacienteNome('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pacienteCpf || !pacienteNome || !dentistaId || !dentistaNome || !dataHora) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const consultaData = {
      pacienteCpf,
      pacienteNome,
      dentistaId,
      dentistaNome,
      dataHora,
    };

    try {
      const response = await fetch('https://web-production-e39ab.up.railway.app/consultas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consultaData),
      });

      if (response.ok) {
        alert('Consulta marcada com sucesso!');
        setPacienteCpf('');
        setPacienteNome('');
        setDentistaId('');
        setDentistaNome('');
        setDataHora('');
      } else {
        alert('Erro ao marcar consulta');
      }
    } catch (error) {
      console.error('Erro ao enviar dados da consulta:', error);
      alert('Erro ao marcar consulta');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 home-container">
      <div className="card shadow-lg p-4 text-center fixed-card">
        <h2 className="mb-4">Marcar Consulta</h2>
        <form onSubmit={handleSubmit}>
          {/* CPF do Paciente */}
          <div className="mb-3 text-start">
            <label className="form-label">Paciente (CPF)</label>
            <input
              type="text"
              className="form-control"
              value={pacienteCpf}
              onChange={handleCpfChange}
              placeholder="Digite o CPF do paciente"
              maxLength="11"
              required
            />
          </div>

          {/* Nome do Paciente (Preenchimento Automático) */}
          <div className="mb-3 text-start">
            <label className="form-label">Nome do Paciente</label>
            <input
              type="text"
              className="form-control"
              value={pacienteNome}
              readOnly
              placeholder="Nome do paciente será preenchido automaticamente"
            />
          </div>

          {/* Seleção do Dentista */}
          <div className="mb-3 text-start">
            <label className="form-label">Dentista</label>
            <select
              className="form-control"
              value={dentistaId}
              onChange={(e) => {
                const selectedDentista = dentistas.find(dentista => dentista.id === e.target.value);
                setDentistaId(e.target.value);
                setDentistaNome(selectedDentista?.nome || '');
              }}
              required
            >
              <option value="">Selecione o dentista</option>
              {dentistas.map((dentista) => (
                <option key={dentista.id} value={dentista.id}>
                  {dentista.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Data e Hora */}
          <div className="mb-3 text-start">
            <label className="form-label">Data e Hora</label>
            <input
              type="datetime-local"
              className="form-control"
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn custom-btn btn-primary w-100">
            Marcar Consulta
          </button>
        </form>
      </div>
    </div>
  );
}

export default MarcarConsulta;
