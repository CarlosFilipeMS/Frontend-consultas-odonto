import React, { useState } from "react";

function CadastroDentista() {
  const [nome, setNome] = useState("");
  const [cro, setCro] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/dentistas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        cro: cro,
      }),
    });

    if (response.ok) {
      alert("Dentista cadastrado com sucesso!");
      setNome("");
      setCro("");
    } else {
      alert("Erro ao cadastrar dentista");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 home-container">
      <div className="card shadow-lg p-4 text-center">
        <h2 className="mb-4">Cadastrar Dentista</h2>
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
          <button type="submit" className="btn custom-btn btn-primary w-100">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroDentista;
