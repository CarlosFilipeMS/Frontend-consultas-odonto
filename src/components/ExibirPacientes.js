import React, { useEffect, useState } from "react";

const ExibirPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/pacientes")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setPacientes(data))
      .catch((error) => setErro(error.message));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lista de Pacientes</h2>
      {erro && <p className="text-danger">Erro: {erro}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.length > 0 ? (
            pacientes.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.id}</td>
                <td>{paciente.nome}</td>
                <td>{paciente.cpf}</td>
                <td>{paciente.dataNascimento}</td>
                <td>{paciente.telefone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Nenhum paciente encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExibirPacientes;
