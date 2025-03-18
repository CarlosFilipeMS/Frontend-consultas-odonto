import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ExibirConsultas.css";

function ExibirConsultas() {
  const [consultas, setConsultas] = useState([]);
  const [visibleConsultas, setVisibleConsultas] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchConsultas() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/consultas");
        if (!response.ok) throw new Error("Erro ao buscar consultas");
        let data = await response.json();

        // Ordena as consultas por data (decrescente)
        data.sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora));

        setConsultas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchConsultas();
  }, []);

  const filteredConsultas = consultas.filter((consulta) => {
    const nomePaciente = consulta.pacienteNome || "Sem paciente";
    const nomeDentista = consulta.dentistaNome || "Sem dentista";
    
    return (
      nomePaciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nomeDentista.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    const tableElement = tableRef.current;

    const handleScroll = () => {
      if (tableElement) {
        const { scrollTop, scrollHeight, clientHeight } = tableElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          setShowLoadMore(true);
        } else {
          setShowLoadMore(false);
        }
      }
    };

    if (tableElement) {
      tableElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (tableElement) {
        tableElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Você tem certeza que deseja deletar essa consulta?")) {
      try {
        const response = await fetch(`http://localhost:8080/consultas/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Erro ao deletar consulta");
        setConsultas(consultas.filter((consulta) => consulta.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="exibir-container">
      <div>
        <button 
          className="btn btn-primary home-button"
          onClick={() => navigate(`/`)}
        >
          Home
        </button>
      </div>
      <div className="card-exibir">
        <h2 className="mb-4">📅 Lista de Consultas</h2>

        <input
          type="text"
          className="search-bar"
          placeholder="Pesquisar consulta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="my-2">
          <button
            className="btn btn-primary mb-2"
            onClick={() => navigate("/marcar-consulta")}
          >
            + Marcar Consulta
          </button>
        </div>

        {loading ? (
          <div>Carregando...</div>
        ) : (
          <div className="table-container" ref={tableRef}>
            <table className="table">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Dentista</th>
                  <th>Data e Hora</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredConsultas.length > 0 ? (
                  filteredConsultas.slice(0, visibleConsultas).map((consulta) => (
                    <tr key={consulta.id}>
                      <td>{consulta.pacienteNome}</td>
                      <td>{consulta.dentistaNome}</td>
                      <td>{new Date(consulta.dataHora).toLocaleString()}</td>
                      <td>
                        <button 
                          className="btn btn-primary m-1"
                          onClick={() => navigate(`/editar-consulta/${consulta.id}`)}
                        >
                          ✏️ Editar
                        </button>
                        <button 
                          className="btn btn-danger m-1"
                          onClick={() => handleDelete(consulta.id)}
                        >
                          🗑️ Deletar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Nenhuma consulta encontrada</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {showLoadMore && visibleConsultas < filteredConsultas.length && (
          <button
            className="btn btn-primary load-more-btn"
            onClick={() => setVisibleConsultas((prev) => prev + 10)}
          >
            Carregar mais
          </button>
        )}
      </div>
    </div>
  );
}

export default ExibirConsultas;
