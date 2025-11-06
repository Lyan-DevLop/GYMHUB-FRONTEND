import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
  getReservasByUsuario,
  updateReserva,
  deleteReserva,
  getServicios,
} from "../services/authService";
import Layout from "../components/layout";
import "../styles/reservas.css";
import { CalendarDays, Clock, Trash2, Edit2, FileText } from "lucide-react";

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingReserva, setEditingReserva] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    servicio_id: "",
    fecha_reserva: "",
  }); // Solo para edición

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

      const [reservasData, serviciosData] = await Promise.all([
        getReservasByUsuario(user.usuario_id),
        getServicios(),
      ]);

      // Combinar datos de reservas y servicios
      const reservasConServicios = reservasData.map((r) => {
        const servicio = serviciosData.find((s) => s.servicio_id === r.servicio_id);
        return {
          ...r,
          nombre_servicio: servicio ? servicio.nombre_servicio : "Desconocido",
          duracion: servicio ? servicio.duracion : "N/A",
        };
      });

      setReservas(reservasConServicios);
      setServicios(serviciosData);
    } catch (error) {
      console.error("Error al cargar reservas:", error);
      const errorMsg = error.message || "No se pudieron cargar las reservas";
      Swal.fire("Error", errorMsg, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const esFechaFutura = (fecha) => {
    const hoy = new Date();
    const fechaSeleccionada = new Date(fecha);
    hoy.setHours(0, 0, 0, 0);
    return fechaSeleccionada >= hoy;
  };



  const handleEdit = (reserva) => {
    setEditingReserva(reserva);
    setFormData({
      servicio_id: reserva.servicio_id.toString(),
      fecha_reserva: reserva.fecha_reserva.split("T")[0],
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateReserva(editingReserva.reserva_id, {
        servicio_id: Number(formData.servicio_id),
        fecha_reserva: formData.fecha_reserva,
      });
      Swal.fire("Actualizado", "Reserva modificada correctamente", "success");
      setShowEditModal(false);
      fetchData();
    } catch (error) {
      console.error("Error al actualizar reserva:", error);
      const errorMsg = error.message || "No se pudo actualizar la reserva";
      Swal.fire("Error", errorMsg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reserva_id, nombre) => {
    const result = await Swal.fire({
      title: `¿Eliminar la reserva de "${nombre}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
      background: "#1a1a2e",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await deleteReserva(reserva_id);
        Swal.fire("Eliminada", "Reserva eliminada correctamente", "success");
        fetchData();
      } catch (error) {
        console.error("Error al eliminar reserva:", error);
        const errorMsg = error.message || "No se pudo eliminar la reserva";
        Swal.fire("Error", errorMsg, "error");
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
            <h1 className="display-5 fw-bold text-gradient">Mis Reservas</h1>
            <button 
              className="btn-primary"
              onClick={() => window.location.href = "/home"}
              style={{ marginTop: "1rem" }}
            >
              Hacer nueva reserva
            </button>
          </motion.header>

          {/* Título de sección */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-header">
            <h2 className="section-title">Mis Reservas</h2>
            <p className="section-subtitle">Gestiona tus reservas activas</p>
          </motion.div>

          {/* Listado de reservas */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="reservas-grid">
            {loading ? (
              <div className="loading-spinner"><div className="spinner" /></div>
            ) : reservas.length === 0 ? (
              <div className="empty-state">
                <CalendarDays size={64} className="text-light opacity-50" />
                <p className="text-light mt-3">No tienes reservas registradas</p>
              </div>
            ) : (
              reservas.map((r) => (
                <motion.div
                  key={r.reserva_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="reserva-card"
                  whileHover={{ y: -5 }}
                >
                  <div className="card-header">
                    <CalendarDays size={20} className="text-primary" />
                    <h3 className="card-title">{r.nombre_servicio}</h3>
                  </div>
                  <div className="card-body">
                    <p className="card-info"><Clock size={16} /> {r.fecha_reserva.split("T")[0]}</p>
                    <p className="card-info"><FileText size={16} /> {r.duracion}</p>
                  </div>
                  <div className="card-actions">
                    <button className="btn-edit" onClick={() => handleEdit(r)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(r.reserva_id, r.nombre_servicio)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>

        {/* Modal de edición */}
        {showEditModal && editingReserva && (
          <div className="modal-backdrop" onClick={() => setShowEditModal(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="modal-glass"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="modal-title">Editar Reserva</h3>
              <form onSubmit={handleUpdate} className="modal-form">
                <select
                  name="servicio_id"
                  value={formData.servicio_id}
                  onChange={handleChange}
                  className="modal-input"
                >
                  <option value="">Seleccionar servicio</option>
                  {servicios.map((s) => (
                    <option key={s.servicio_id} value={s.servicio_id}>
                      {s.nombre_servicio}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  name="fecha_reserva"
                  value={formData.fecha_reserva}
                  onChange={handleChange}
                  className="modal-input"
                />
                <div className="modal-actions">
                  <button 
                    type="button" 
                    onClick={() => setShowEditModal(false)} 
                    className="btn-cancel"
                    disabled={submitting}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="btn-save"
                    disabled={submitting}
                  >
                    {submitting ? "Guardando..." : "Guardar"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Reservas;
