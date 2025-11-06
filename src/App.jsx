// src/App.jsx
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Home from "./pages/home.jsx";
import Layout from "./components/layout.jsx";
import Footer from "./components/footer.jsx";
import Navbar from "./components/navbar.jsx";
import Servicios from "./pages/servicios.jsx";
import Perfil from "./pages/perfil.jsx";
import Reservas from "./pages/reservas.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";

import "./App.css";
import "./index.css";

const NotFound = () => (
  <div className="not-found" style={{ textAlign: "center", marginTop: "4rem" }}>
    <h1>404 - Página no encontrada</h1>
    <p>La página que buscas no existe o fue movida.</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/servicios",
    element: <Servicios />,
  },
  {
    path: "/perfil",
    element: <Perfil />,
  },
  {
    path: "/reservas",
    element: <Reservas />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

export default App;


