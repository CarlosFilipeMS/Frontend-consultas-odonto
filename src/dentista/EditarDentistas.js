import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditarDentista() {
  const { id } = useParams(); // Captura o ID da URL
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [cro, setCro] = useState("");

  useEffect(() => {
    async function fetchDentista() {
      try {
        const response = await fetch(`https://web-production-e39ab.up.railway.app/dentistas/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar dentista");
        const data = await response.json();
        setNome(data.nome);
        setCro(data.cro);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDentista();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`https://web-production-e39ab.up.railway.app/dentistas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, cro }),
    });

    if (response.ok) {
      alert("Dentista atualizado com sucesso!");
      navigate("/exibir-dentistas"); // Redireciona para a lista de dentistas
    } else {
      alert("Erro ao atualizar dentista");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 home-container">
      <div className="card shadow-lg p-4 text-center">
        <h2 className="mb-4">Editar Dentista</h2>
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
            <label className="form-label">CRO</label>
            <input
              type="text"
              className="form-control"
              value={cro}
              onChange={(e) => setCro(e.target.value)}
              placeholder="CRO"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditarDentista;
