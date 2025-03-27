import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ExibirConsultas.css";

function EditarConsulta() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consulta, setConsulta] = useState(null);
  const [dataHora, setDataHora] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConsulta() {
      try {
        const response = await fetch(`https://web-production-e39ab.up.railway.app/consultas/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar consulta");
        const data = await response.json();
        setConsulta(data);
        setDataHora(data.dataHora);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchConsulta();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api-consultas-odonto.vercel.app/consultas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: consulta.id,
          pacienteCpf: consulta.pacienteCpf,
          pacienteNome: consulta.pacienteNome,
          dentistaId: consulta.dentistaId,
          dentistaNome: consulta.dentistaNome,
          dataHora,
        }),
      });
      if (!response.ok) throw new Error("Erro ao atualizar consulta");
      alert("Consulta atualizada com sucesso!");
      navigate("/consultas");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (!consulta) return <div>Consulta não encontrada.</div>;

  return (
    <div className="exibir-container">
      <div className="card-exibir">
        <h2>✏️ Editar Consulta</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Paciente:</label>
            <input type="text" value={consulta.pacienteNome} disabled className="form-control" />
          </div>
          <div className="form-group">
            <label>CPF do Paciente:</label>
            <input type="text" value={consulta.pacienteCpf} disabled className="form-control" />
          </div>
          <div className="form-group">
            <label>Dentista:</label>
            <input type="text" value={consulta.dentistaNome} disabled className="form-control" />
          </div>
          <div className="form-group">
            <label>Data e Hora:</label>
            <input
              type="datetime-local"
              className="form-control"
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditarConsulta;
