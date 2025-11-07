// src/App.jsx
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Home from "./pages/home.jsx";
import Servicios from "./pages/servicios.jsx";
import Perfil from "./pages/perfil.jsx";
import Reservas from "./pages/reservas.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";

import "./App.css";
import "./index.css";

// 🔒 Componente interno para proteger rutas
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // o el método que uses
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

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
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/servicios",
    element: (
      <ProtectedRoute>
        <Servicios />
      </ProtectedRoute>
    ),
  },
  {
    path: "/perfil",
    element: (
      <ProtectedRoute>
        <Perfil />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reservas",
    element: (
      <ProtectedRoute>
        <Reservas />
      </ProtectedRoute>
    ),
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



