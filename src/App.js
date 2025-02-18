import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CadastroPaciente from "./components/CadastroPaciente";
import ExibirPacientes from "./components/ExibirPacientes"; // Importando o componente

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro-paciente" element={<CadastroPaciente />} />
        <Route path="/exibir-pacientes" element={<ExibirPacientes />} /> {/* Nova rota */}
      </Routes>
    </Router>
  );
}

export default App;
