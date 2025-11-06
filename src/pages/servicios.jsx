import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { getUsuarios, createServicio, getServicios, updateServicio, deleteServicio } from "../services/authService";
import Layout from "../components/layout";
import "../styles/servicios.css";
import { Plus, Edit2, Trash2, Clock, Users, FileText } from "lucide-react";

const Servicios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingServicio, setEditingServicio] = useState(null);

  const [formData, setFormData] = useState({
    nombre_servicio: "",
    usuario_id: "",
    duracion: "00:30",
    cupos: "",
    descripcion: "",
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const userData = localStorage.getItem("usuario");
      if (!userData) {
        Swal.fire("Sesión expirada", "Inicia sesión nuevamente", "info").then(() => {
          window.location.href = "/login";
        });
        return;
      }
      const user = JSON.parse(userData);
      setUsuario(user);

      const [usuariosData, serviciosData] = await Promise.all([getUsuarios(), getServicios()]);
      const entrenadores = usuariosData.filter((u) => u.rol_id === 1);

      const serviciosConNombre = serviciosData.map((s) => ({
        ...s,
        nombre_usuario: entrenadores.find((u) => u.usuario_id === s.usuario_id)?.nombre_usuario || "Desconocido",
      }));

      setUsuarios(entrenadores);
      setServicios(serviciosConNombre);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      const errorMessage = error.message || "No se pudieron cargar los datos";
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () => {
    setFormData({ nombre_servicio: "", usuario_id: "", duracion: "00:30", cupos: "", descripcion: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre_servicio || !formData.usuario_id || !formData.duracion || !formData.cupos) {
      Swal.fire("Campos requeridos", "Completa todos los campos", "warning");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...formData,
        duracion: `${formData.duracion.split(":")[0]}h ${formData.duracion.split(":")[1]}m`,
        cupos: Number(formData.cupos),
        usuario_id: Number(formData.usuario_id),
      };

      await createServicio(payload);
      Swal.fire("Éxito", "Servicio creado correctamente", "success");
      resetForm();
      setShowCreateModal(false);
      fetchData();
    } catch (error) {
      const errorMessage = error.message || "No se pudo crear el servicio";
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    resetForm();
    setShowCreateModal(true);
  };

  const handleEdit = (servicio) => {
    setEditingServicio(servicio);
    setFormData({
      nombre_servicio: servicio.nombre_servicio,
      usuario_id: servicio.usuario_id.toString(),
      duracion: servicio.duracion.replace("h ", ":").replace("m", ""),
      cupos: servicio.cupos.toString(),
      descripcion: servicio.descripcion,
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingServicio) return;

    try {
      setLoading(true);
      const payload = {
        ...formData,
        duracion: `${formData.duracion.split(":")[0]}h ${formData.duracion.split(":")[1]}m`,
        cupos: Number(formData.cupos),
        usuario_id: Number(formData.usuario_id),
      };

      await updateServicio(editingServicio.servicio_id, payload);
      Swal.fire("Actualizado", "Servicio modificado con éxito", "success");
      setShowEditModal(false);
      setEditingServicio(null);
      fetchData();
    } catch (error) {
      const errorMessage = error.message || "No se pudo actualizar";
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, nombre) => {
    const result = await Swal.fire({
      title: `¿Eliminar "${nombre}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#1a1a2e",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await deleteServicio(id);
        Swal.fire("Eliminado", "Servicio eliminado correctamente", "success");
        fetchData();
      } catch (error) {
        const errorMessage = error.message || "No se pudo eliminar el servicio";
        Swal.fire("Error", errorMessage, "error");
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
        <div className="particles">
          {Array.from({ length: 30 }).map((_, i) => (
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
          <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="title-section">
            <h1 className="display-5 fw-bold text-gradient">Gestión de Servicios</h1>
          </motion.header>

          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fab-btn"
            onClick={handleCreate}
          >
            <Plus size={28} />
          </motion.button>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="servicios-grid">
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            ) : servicios.length === 0 ? (
              <div className="empty-state">
                <Clock size={64} className="text-light opacity-50" />
                <p className="text-light mt-3">No hay servicios disponibles</p>
              </div>
            ) : (
              servicios.map((s, i) => (
                <motion.div
                  key={`servicio-${s.servicio_id || i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="servicio-card"
                  whileHover={{ y: -5 }}
                >
                  <div className="card-header">
                    <Users size={20} className="text-primary" />
                    <h3 className="card-title">{s.nombre_servicio}</h3>
                  </div>
                  <div className="card-body">
                    <p className="card-info"><Clock size={16} /> {s.duracion}</p>
                    <p className="card-info"><Users size={16} /> {s.cupos} cupos</p>
                    <p className="card-info text-muted"><FileText size={16} /> {s.nombre_usuario}</p>
                  </div>
                  <div className="card-footer">
                    <button className="btn-edit" onClick={() => handleEdit(s)}><Edit2 size={16} /></button>
                    <button className="btn-delete" onClick={() => handleDelete(s.servicio_id, s.nombre_servicio)}><Trash2 size={16} /></button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>

        {showEditModal && editingServicio && (
          <div className="modal-backdrop" onClick={() => setShowEditModal(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="modal-glass"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="modal-title">Editar Servicio</h3>
              <form onSubmit={handleUpdate} className="modal-form">
                <input type="text" name="nombre_servicio" value={formData.nombre_servicio} onChange={handleChange} placeholder="Nombre" required className="modal-input" />
                <select name="usuario_id" value={formData.usuario_id} onChange={handleChange} required className="modal-input">
                  <option value="">Seleccionar entrenador</option>
                  {usuarios.map((u) => (
                    <option key={u.usuario_id} value={u.usuario_id}>{u.nombre_usuario}</option>
                  ))}
                </select>
                <input type="time" name="duracion" value={formData.duracion} onChange={handleChange} step="300" required className="modal-input" />
                <input type="number" name="cupos" value={formData.cupos} onChange={handleChange} min="1" required className="modal-input" />
                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="2" placeholder="Descripción" className="modal-input"></textarea>
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowEditModal(false)} className="btn-cancel">Cancelar</button>
                  <button type="submit" disabled={loading} className="btn-save">{loading ? "Guardando..." : "Guardar"}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showCreateModal && (
          <div className="modal-backdrop" onClick={() => setShowCreateModal(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="modal-glass"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="modal-title">Crear Nuevo Servicio</h3>
              <form onSubmit={handleSubmit} className="modal-form">
                <input type="text" name="nombre_servicio" value={formData.nombre_servicio} onChange={handleChange} placeholder="Nombre del servicio" required className="modal-input" />
                <select name="usuario_id" value={formData.usuario_id} onChange={handleChange} required className="modal-input">
                  <option value="">Seleccionar entrenador</option>
                  {usuarios.map((u) => (
                    <option key={u.usuario_id} value={u.usuario_id}>{u.nombre_usuario}</option>
                  ))}
                </select>
                <input type="time" name="duracion" value={formData.duracion} onChange={handleChange} step="300" required className="modal-input" />
                <input type="number" name="cupos" value={formData.cupos} onChange={handleChange} min="1" required className="modal-input" />
                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="2" placeholder="Descripción (opcional)" className="modal-input"></textarea>
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowCreateModal(false)} className="btn-cancel">Cancelar</button>
                  <button type="submit" disabled={loading} className="btn-save">{loading ? "Creando..." : "Crear"}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showCreateModal && (
          <div className="modal-backdrop" onClick={() => setShowCreateModal(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="modal-glass"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="modal-title">Crear Nuevo Servicio</h3>
              <form onSubmit={handleSubmit} className="modal-form">
                <input type="text" name="nombre_servicio" value={formData.nombre_servicio} onChange={handleChange} placeholder="Nombre del servicio" required className="modal-input" />
                <select name="usuario_id" value={formData.usuario_id} onChange={handleChange} required className="modal-input">
                  <option value="">Seleccionar entrenador</option>
                  {usuarios.map((u) => (
                    <option key={u.usuario_id} value={u.usuario_id}>{u.nombre_usuario}</option>
                  ))}
                </select>
                <input type="time" name="duracion" value={formData.duracion} onChange={handleChange} step="300" required className="modal-input" />
                <input type="number" name="cupos" value={formData.cupos} onChange={handleChange} min="1" required className="modal-input" />
                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="2" placeholder="Descripción (opcional)" className="modal-input"></textarea>
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowCreateModal(false)} className="btn-cancel">Cancelar</button>
                  <button type="submit" disabled={loading} className="btn-save">{loading ? "Creando..." : "Crear"}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Servicios;
