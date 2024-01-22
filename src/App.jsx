import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TemplatePage from "./templates/Page";
import TemplateClean from "./templates/Clean";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

import Pagamentos from "./pages/Pagamentos/Pagamentos";
import RegistroPagamentos from "./pages/Pagamentos/RegistroPagamento";
import EditarPagamentos from "./pages/Pagamentos/EditarPagamentos";

import Saldos from "./pages/Saldos/Saldos";
import RegistroSaldos from "./pages/Saldos/RegistroSaldo";
import EditarSaldos from "./pages/Saldos/EditarSaldo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<TemplateClean title="Faça seu login" Component={Login} />}
        />
        <Route
          path="/pagamentos/edit/:id"
          element={
            <TemplatePage title="Pagamentos" Component={EditarPagamentos} />
          }
        />
        <Route
          path="/pagamentos/edit/:id"
          element={
            <TemplatePage title="Pagamentos" Component={EditarPagamentos} />
          }
        />
        <Route
          path="/pagamentos/add"
          element={
            <TemplatePage title="Pagamentos" Component={RegistroPagamentos} />
          }
        />
        <Route
          path="/pagamentos"
          element={<TemplatePage title="Pagamentos" Component={Pagamentos} />}
        />
        <Route
          path="/saldos/edit/:id"
          element={<TemplatePage title="Saldos" Component={EditarSaldos} />}
        />
        <Route
          path="/saldos/add"
          element={<TemplatePage title="Saldos" Component={RegistroSaldos} />}
        />
        <Route
          path="/saldos"
          element={<TemplatePage title="Saldos" Component={Saldos} />}
        />
        <Route
          path="/"
          element={<TemplatePage title="Página inicial" Component={Home} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
