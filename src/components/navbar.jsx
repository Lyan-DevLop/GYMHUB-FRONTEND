import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsuarioById } from "../services/authService";
import "../styles/navbar.css";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Cargar usuario autenticado desde localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setRole(storedUser.role || "Usuario");
      setUserName(storedUser.name || "Invitado");
      setUserData(storedUser);
    } else {
      setRole("Invitado");
    }
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setRole("Invitado");
    setUserName("");
    setUserData(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <div className="navbar-brand">
          <Link to="/home" className="navbar-logo">
            GYMHUB
          </Link>
        </div>

        {/* ENLACES */}
        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          <li>
            <Link to="/servicios" title="Servicios">
              Servicios
            </Link>
          </li>
          <li>
            <Link to="/reservas" title="Reservas">
              Reservas
            </Link>
          </li>

          {/* Si el usuario es administrador (rol_id 1), puede tener extras */}
          {userData?.rol_id === 1 && (
            <>
              <li>
                <Link to="/servicios" title="Servicios">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/reservas" title="Reservas">
                  Reservas
                </Link>
              </li>
            </>
          )}

          {/* Perfil */}
          <li>
            <Link to="/perfil" title="Perfil">
              <i className="bi bi-person-circle" style={{ fontSize: "1.5rem" }}></i>
            </Link>
          </li>
        {/* Usuario autenticado */}
        <div className="navbar-user">
          {userName && (
            <span className="navbar-username">
              {userName}
            </span>
          )}
        </div>
          {/* Cerrar sesión */}
          <li>
            <a href="#" onClick={handleSignOut} title="Cerrar sesión">
              <i className="bi bi-box-arrow-right" style={{ fontSize: "1.4rem" }}></i>
            </a>
          </li>
        </ul>

        

        {/* BOTÓN RESPONSIVE */}
        <div className="header-controls">
          <button className="navbar-toggler" onClick={toggleMenu} title="Menú">
            <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;


