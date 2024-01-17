import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TemplatePage from "./templates/Page";
import TemplateClean from "./templates/Clean";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Pagamentos from "./pages/Pagamentos/Pagamentos";
import Saldos from "./pages/Saldos/Saldos";

import { AuthProvider } from "./state/auth";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <TemplateClean title="Acesso Restrito" Component={Login} /> // Aplicando templates de titulo nas paginas no component Customers
            }
          />
          <Route
            path="/pagamentos"
            element={
              <TemplatePage title="Pagamentos" Component={Pagamentos} /> // Aplicando templates de titulo nas paginas no component Customers
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
