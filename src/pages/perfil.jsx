import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Layout from "../components/layout";
import {
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
} from "../services/authService";
import "../styles/perfil.css";
import { User, Mail, Shield, Edit2, Trash2, Save } from "lucide-react";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [formData, setFormData] = useState({
    nombre_usuario: "",
    correo: "",
    rol: "",
    contrasena: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (!userData) {
      Swal.fire("Sesión expirada", "Inicia sesión nuevamente", "info").then(
        () => {
          window.location.href = "/login";
        }
      );
      return;
    }

    const user = JSON.parse(userData);
    fetchUsuario(user.usuario_id);
  }, []);

  const fetchUsuario = async (id) => {
    try {
      const data = await getUsuarioById(id);
      setUsuario(data);
      setFormData({
        nombre_usuario: data.nombre_usuario,
        correo: data.correo,
        rol: data.rol_id === 1 ? "Administrador" : "Usuario",
        contrasena: "",
      });
    } catch (error) {
      Swal.fire("Error", "No se pudo cargar el perfil", "error");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        nombre_usuario: formData.nombre_usuario,
        correo: formData.correo,
        contrasena: formData.contrasena || undefined,
      };

      await updateUsuario(usuario.usuario_id, payload);
      Swal.fire("Perfil actualizado", "", "success");
      setEditMode(false);
      fetchUsuario(usuario.usuario_id);
    } catch {
      Swal.fire("Error", "No se pudo actualizar el perfil", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Eliminar cuenta?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#1a1a2e",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await deleteUsuario(usuario.usuario_id);
        Swal.fire("Cuenta eliminada", "", "success").then(() => {
          localStorage.removeItem("usuario");
          window.location.href = "/login";
        });
      } catch {
        Swal.fire("Error", "No se pudo eliminar la cuenta", "error");
      }
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Cerrar sesión",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
      background: "#1a1a2e",
      color: "#fff",
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.removeItem("usuario");
        window.location.href = "/login";
      }
    });
  };

  return (
    <Layout onLogout={handleLogout} usuario={usuario || undefined}>
      <div className="servicios-fullscreen">
        {/* Partículas decorativas */}
        <div className="particles">
          {[...Array(30)].map((_, i) => (
            <span
              key={`particle-${i}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="content-wrapper">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="title-section"
          >
            <h1 className="display-5 fw-bold text-gradient">Mi Perfil</h1>
            <p className="section-subtitle">Gestiona tu cuenta personal</p>
          </motion.header>

          {/* Perfil card */}
          {!usuario ? (
            <div className="loading-spinner"><div className="spinner" /></div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="perfil-card glass-card"
            >
              <div className="perfil-header">
                <div className="perfil-avatar">
                  <User size={64} className="text-primary" />
                </div>
                <h2 className="perfil-nombre text-gradient">{usuario.nombre_usuario}</h2>
                <p className="perfil-rol">
                  <Shield size={16} /> {formData.rol}
                </p>
              </div>

              {!editMode ? (
                <div className="perfil-info">
                  <p><Mail className="icon" /> {usuario.correo}</p>
                  <div className="perfil-actions">
                    <button className="btn-edit" onClick={() => setEditMode(true)}>
                      <Edit2 size={16} /> Editar
                    </button>
                    <button className="btn-delete" onClick={handleDelete}>
                      <Trash2 size={16} /> Eliminar
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdate} className="perfil-form">
                  <div className="input-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="nombre_usuario"
                      value={formData.nombre_usuario}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Correo</label>
                    <input
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Nueva contraseña (opcional)</label>
                    <input
                      type="password"
                      name="contrasena"
                      value={formData.contrasena}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="perfil-actions">
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => setEditMode(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn-save" disabled={loading}>
                      <Save size={16} /> {loading ? "Guardando..." : "Guardar"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Perfil;
