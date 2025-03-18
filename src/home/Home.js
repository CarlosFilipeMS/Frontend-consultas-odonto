import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 text-center">
        <h1 className="mb-4">Sistema de Consultas</h1>
        <p className="text-muted">Gerencie pacientes, dentistas e consultas de forma simples e eficiente.</p>
        <div className="d-grid gap-3 mt-3">
          <button className="btn btn-primary p-3" onClick={() => navigate("/pacientes")}>
            👥 Pacientes
          </button>
          <button className="btn btn-secondary p-3" onClick={() => {
              navigate("/dentistas");
            }}>
            🦷 Dentistas
          </button>
          <button className="btn btn-success p-3" onClick={() => navigate("/consultas")}>📅 Consultas</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
