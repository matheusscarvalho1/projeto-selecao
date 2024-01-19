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

import { AuthProvider } from "./state/auth";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <TemplateClean title="Faça seu login" Component={Login} /> // Aplicando templates de titulo nas paginas no component Customers
            }
          />
          <Route
            path="/pagamentos/edit/:id"
            element={
              <TemplatePage title="Pagamentos" Component={EditarPagamentos} /> // Aplicando templates de titulo nas paginas no component Customers
            }
          />
          <Route
            path="/pagamentos/edit/:id"
            element={
              <TemplatePage title="Pagamentos" Component={EditarPagamentos} /> // Aplicando templates de titulo nas paginas no component Customers
            }
          />
          <Route
            path="/pagamentos/add"
            element={
              <TemplatePage title="Pagamentos" Component={RegistroPagamentos} /> // Aplicando templates de titulo nas paginas no component Customers
            }
          />
          <Route
            path="/pagamentos"
            element={
              <TemplatePage title="Pagamentos" Component={Pagamentos} /> // Aplicando templates de titulo nas paginas no component Customers
            }
          />
          <Route
            path="/saldos/edit/:id"
            element={
              <TemplatePage title="Saldos" Component={EditarSaldos} /> // Aplicando templates de titulo nas paginas no component Customers
            }
          />
          <Route
            path="/saldos/add"
            element={
              <TemplatePage title="Saldos" Component={RegistroSaldos} /> // Aplicando templates de titulo nas paginas no component Customers
            }
          />
          <Route
            path="/saldos"
            element={
              <TemplatePage title="Saldos" Component={Saldos} /> // Aplicando templates de titulo nas paginas no component Customers
            }
          />
          <Route
            path="/"
            element={
              <TemplatePage title="Página inicial" Component={Home} /> // Aplicando templates de titulo nas paginas no component Home
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
