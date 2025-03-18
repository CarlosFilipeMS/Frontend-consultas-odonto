import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import CadastroPaciente from "./paciente/CadastroPaciente";
import ExibirPacientes from "./paciente/ExibirPacientes";
import CadastroDentista from "./dentista/CadastroDentista";
import ExibirDentistas from "./dentista/ExibirDentistas";
import EditarDentista from "./dentista/EditarDentistas";
import EditarPaciente from "./paciente/EditarPaciente";
import ExibirConsultas from "./consulta/ExibirConsultas";
import MarcarConsulta from "./consulta/MarcarConsulta";
import EditarConsulta from "./consulta/EditarConsultas";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro-paciente" element={<CadastroPaciente />} />
        <Route path="/pacientes" element={<ExibirPacientes />} />
        <Route path="/editar-paciente/:id" element={<EditarPaciente />} />
        <Route path="/cadastro-dentista" element={<CadastroDentista />} />
        <Route path="/dentistas" element={<ExibirDentistas />} />
        <Route path="/editar-dentista/:id" element={<EditarDentista />} />
        <Route path="/consultas" element={<ExibirConsultas />} />
        <Route path="/marcar-consulta" element={<MarcarConsulta />} />
        <Route path="editar-consulta/:id" element={<EditarConsulta />} />
      </Routes>
    </Router>
  );
}

export default App;
