import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ExibirPacientes.css";

function ExibirPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const tableRef = useRef(null);

  useEffect(() => {
    async function fetchPacientes() {
      try {
        const response = await fetch("https://web-production-e39ab.up.railway.app/pacientes");
        if (!response.ok) throw new Error("Erro ao buscar pacientes");
        const data = await response.json();
        setPacientes(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPacientes();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este paciente?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://web-production-e39ab.up.railway.app/pacientes/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erro ao deletar paciente");

      setPacientes(pacientes.filter((paciente) => paciente.id !== id));
      alert("Paciente excluído com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir paciente.");
    }
  };

  return (
    <div className="exibir-container">
      <button 
          className="btn btn-primary home-button"
          onClick={() => navigate(`/`)}
        >
          Home
      </button>
      <div className="card-exibir">
        <h2 className="mb-4">📋Lista de Pacientes</h2>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <input
            type="text"
            className="search-bar"
            placeholder="Pesquisar paciente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-primary m-3" onClick={() => navigate("/cadastro-paciente")}>+ Cadastrar Paciente</button>


        <div className="table-container" ref={tableRef}>
          <table className="table">
            <thead>
              <tr>
                <th>UUID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Data de Nascimento</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.length > 0 ? (
                pacientes
                  .filter((paciente) => paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((paciente) => (
                    <tr key={paciente.id}>
                      <td>{paciente.id}</td>
                      <td>{paciente.nome}</td>
                      <td>{paciente.cpf}</td>
                      <td>{paciente.dataNascimento}</td>
                      <td>{paciente.telefone}</td>
                      <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => navigate(`/editar-paciente/${paciente.id}`)}
                      >
                        ✏️ Editar
                      </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(paciente.id)}>
                          🗑️ Excluir
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="6">Nenhum paciente encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ExibirPacientes;
