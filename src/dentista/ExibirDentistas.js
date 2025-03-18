import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ExibirDentistas.css"; // Crie um CSS específico para a página
import Home from "../home/Home";

function ExibirDentistas() {
  const [dentistas, setDentistas] = useState([]);
  const [visibleDentistas, setVisibleDentistas] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLoadMore, setShowLoadMore] = useState(false);
  const tableRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDentistas() {
      try {
        const response = await fetch("http://localhost:8080/dentistas");
        if (!response.ok) throw new Error("Erro ao buscar dentistas");
        const data = await response.json();
        setDentistas(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDentistas();
  }, []);

  const filteredDentistas = dentistas.filter((dentista) =>
    dentista.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    if (window.confirm("Tem certeza que deseja deletar este dentista?")) {
      const response = await fetch(`http://localhost:8080/dentistas/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert("Dentista deletado com sucesso!");
        setDentistas(dentistas.filter(dentista => dentista.id !== id));
      } else {
        alert("Erro ao deletar dentista");
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
        <h2 className="mb-4">🦷Lista de Dentistas</h2>

        {/* Barra de pesquisa */}
        <input
          type="text"
          className="search-bar"
          placeholder="Pesquisar dentista..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Botão de cadastrar dentista */}
        <button
          className="btn btn-primary mt-1 mb-4"
          onClick={() => navigate("/cadastro-dentista")}
        >
          + Cadastrar Dentista
        </button>

        {/* Tabela de Dentistas */}
        <div className="table-container" ref={tableRef}>
          <table className="table">
            <thead>
              <tr>
                <th>UUID</th>
                <th>Nome</th>
                <th>CRO</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredDentistas.length > 0 ? (
                filteredDentistas.slice(0, visibleDentistas).map((dentista) => (
                  <tr key={dentista.id}>
                    <td>{dentista.id}</td>
                    <td>{dentista.nome}</td>
                    <td>{dentista.cro}</td>
                    <td>
                      <button
                        className="btn btn-primary m-1"
                        onClick={() => navigate(`/editar-dentista/${dentista.id}`)}
                      >
                       ✏️ Editar
                      </button>
                      <button
                        className="btn btn-danger m-1"
                        onClick={() => handleDelete(dentista.id)}
                      >
                       🗑️ Deletar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Nenhum dentista encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Botão "Carregar Mais" */}
        {showLoadMore && visibleDentistas < filteredDentistas.length && (
          <button
            className="btn btn-primary load-more-btn"
            onClick={() => setVisibleDentistas((prev) => prev + 10)}
          >
            Carregar mais
          </button>
        )}
      </div>
    </div>
  );
}

export default ExibirDentistas;
