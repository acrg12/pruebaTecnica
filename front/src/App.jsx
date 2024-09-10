import React from "react";
import BuscarAnimales from "./buscarAnimales";
import Resultados from "./Resultado";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BuscarAnimales />}></Route>
        <Route path="/resultados" element={<Resultados />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
