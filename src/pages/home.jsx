import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import "../styles/home.css";
import { getServicios, createReserva } from "../services/authService";
import Swal from "sweetalert2";

const Home = () => {
  const [servicios, setServicios] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const data = await getServicios();
        setServicios(data);
      } catch (error) {
        console.error("Error al obtener servicios:", error);
        Swal.fire({
          icon: "error",
          title: "Error al cargar servicios",
          text: "No se pudieron obtener los servicios desde el servidor.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
    const user = localStorage.getItem("usuario");
    if (user) setUsuario(JSON.parse(user));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  const handleReservar = async (servicio) => {
    if (!usuario) {
      Swal.fire({
        icon: "warning",
        title: "Inicia sesión",
        text: "Debes iniciar sesión para hacer reservas",
        showCancelButton: true,
        confirmButtonText: "Ir a login",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    const { value: fecha } = await Swal.fire({
      title: `Reservar ${servicio.nombre_servicio}`,
      html: `
        <p><strong>Duración:</strong> ${servicio.duracion}</p>
        <p><strong>Cupos disponibles:</strong> ${servicio.cupos}</p>
        <p><strong>Descripción:</strong> ${servicio.descripcion || "Sin descripción"}</p>
        <input type="date" id="fecha-reserva" class="swal2-input" min="${new Date().toISOString().split('T')[0]}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Reservar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const fecha = document.getElementById("fecha-reserva").value;
        if (!fecha) {
          Swal.showValidationMessage("Por favor selecciona una fecha");
          return false;
        }
        const fechaSeleccionada = new Date(fecha);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        if (fechaSeleccionada < hoy) {
          Swal.showValidationMessage("La fecha debe ser hoy o futura");
          return false;
        }
        return fecha;
      },
    });

    if (fecha) {
      try {
        await createReserva({
          usuario_id: usuario.usuario_id,
          servicio_id: servicio.servicio_id,
          fecha_reserva: fecha,
          estado_id: 1,
        });

        Swal.fire({
          icon: "success",
          title: "¡Reserva realizada!",
          text: `Has reservado ${servicio.nombre_servicio} para el ${fecha}`,
          showCancelButton: true,
          confirmButtonText: "Ver mis reservas",
          cancelButtonText: "Cerrar",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/reservas");
          }
        });
      } catch (error) {
        console.error("Error al crear reserva:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "No se pudo crear la reserva",
        });
      }
    }
  };

  return (
    <Layout onLogout={handleLogout} usuario={usuario || undefined}>
      <main className="home-content">
        <header className="home-header">
          <h1>
            Bienvenido a <span>GymHub</span>
          </h1>
          <p>
            Transforma tu cuerpo y mente con los mejores entrenadores y
            servicios personalizados.
          </p>
        </header>

        <section className="servicios-section">
          <h2>Nuestros Servicios</h2>
          {loading ? (
            <p className="cargando">Cargando servicios...</p>
          ) : servicios.length > 0 ? (
            <div className="servicios-grid">
              {servicios.map((servicio) => (
                <div key={servicio.servicio_id} className="servicio-card">
                  <h3>{servicio.nombre_servicio}</h3>
                  <p className="descripcion">{servicio.descripcion}</p>
                  <p className="cupos">
                    <strong>Cupos:</strong> {servicio.cupos}
                  </p>
                  <p className="duracion">
                    <strong>Duración:</strong> {servicio.duracion}
                  </p>
                  <button
                    className="btn-reservar"
                    onClick={() => handleReservar(servicio)}
                  >
                    Reservar ahora
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="sin-servicios">No hay servicios disponibles.</p>
          )}
        </section>
      </main>
    </Layout>
  );
};

export default Home;


