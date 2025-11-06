import api from "../api";

// USUARIOS
// Crear usuario (registro)
export const registerUser = async (data) => {
  try {
    const res = await api.post("/usuarios", data);
    return res.data;
  } catch (error) {
    console.error("Error en registerUser:", error.response?.data || error.message);
    if (error.message.includes("Network")) {
      console.warn("Verifica que el backend FastAPI esté corriendo y sin errores de CORS.");
    }
    throw error.response?.data || error;
  }
};

// Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const res = await api.get("/usuarios");
    return res.data;
  } catch (error) {
    console.error("Error en getUsuarios:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Obtener un usuario por ID
export const getUsuarioById = async (usuario_id) => {
  try {
    const res = await api.get(`/usuarios/${usuario_id}`);
    return res.data;
  } catch (error) {
    console.error("Error en getUsuarioById:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Actualizar usuario
export const updateUsuario = async (usuario_id, data) => {
  try {
    const res = await api.patch(`/usuarios/${usuario_id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error en updateUsuario:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Eliminar usuario
export const deleteUsuario = async (usuario_id) => {
  try {
    await api.delete(`/usuarios/${usuario_id}`);
  } catch (error) {
    console.error("Error en deleteUsuario:", error.response?.data || error.message);
    throw error;
  }
};

// LOGIN (mock login)
export const loginUser = async (data) => {
  try {
    const res = await api.get("/usuarios");
    const usuarios = res.data;
    const user = usuarios.find(
      (u) => u.correo === data.correo && u.contrasena === data.contrasena
    );

    if (!user) throw new Error("Credenciales incorrectas");

    localStorage.setItem("usuario", JSON.stringify(user));
    return { message: "Login correcto", usuario: user };
  } catch (error) {
    console.error("Error en loginUser:", error.response?.data || error.message);
    throw error;
  }
};

// ROLES
// Obtener todos los roles
export const getRoles = async () => {
  try {
    const res = await api.get("/roles");
    return res.data;
  } catch (error) {
    console.error("Error en getRoles:", error.response?.data || error.message);
    throw error;
  }
};

// Crear rol
export const createRol = async (data) => {
  try {
    const res = await api.post("/roles", data);
    return res.data;
  } catch (error) {
    console.error("Error en createRol:", error.response?.data || error.message);
    throw error;
  }
};

// Actualizar rol
export const updateRol = async (rol_id, data) => {
  try {
    const res = await api.put(`/roles/${rol_id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error en updateRol:", error.response?.data || error.message);
    throw error;
  }
};

// Eliminar rol
export const deleteRol = async (rol_id) => {
  try {
    await api.delete(`/roles/${rol_id}`);
  } catch (error) {
    console.error("Error en deleteRol:", error.response?.data || error.message);
    throw error;
  }
};

// SERVICIOS
// Obtener todos los servicios
export const getServicios = async () => {
  try {
    const res = await api.get("/servicios");
    return res.data;
  } catch (error) {
    console.error("Error en getServicios:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Obtener un servicio por ID
export const getServicioById = async (servicio_id) => {
  try {
    const res = await api.get(`/servicios/${servicio_id}`);
    return res.data;
  } catch (error) {
    console.error("Error en getServicioById:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Crear servicio
export const createServicio = async (data) => {
  try {
    const res = await api.post("/servicios", data);
    return res.data;
  } catch (error) {
    console.error("Error en createServicio:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Actualizar servicio
export const updateServicio = async (servicio_id, data) => {
  try {
    const res = await api.patch(`/servicios/${servicio_id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error en updateServicio:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Eliminar servicio  
export const deleteServicio = async (servicio_id) => {
  try {
    const res = await api.delete(`/servicios/${servicio_id}`);
    return res.data;
  } catch (error) {
    console.error("Error en deleteServicio:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// ESTADOS
// Obtener todos los estados
export const getEstados = async () => {
  try {
    const res = await api.get("/estado");
    return res.data;
  } catch (error) {
    console.error("Error en getEstados:", error.response?.data || error.message);
    throw error;
  }
};

// Crear estado
export const createEstado = async (data) => {
  try {
    const res = await api.post("/estado", data);
    return res.data;
  } catch (error) {
    console.error("Error en createEstado:", error.response?.data || error.message);
    throw error;
  }
};

// Actualizar estado
export const updateEstado = async (estado_id, data) => {
  try {
    const res = await api.put(`/estado/${estado_id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error en updateEstado:", error.response?.data || error.message);
    throw error;
  }
};

// Eliminar estado
export const deleteEstado = async (estado_id) => {
  try {
    await api.delete(`/estado/${estado_id}`);
  } catch (error) {
    console.error("Error en deleteEstado:", error.response?.data || error.message);
    throw error;
  }
};

// RESERVAS
// Obtener todas las reservas
export const getReservas = async () => {
  try {
    const res = await api.get("/reservas");
    return res.data;
  } catch (error) {
    console.error("Error en getReservas:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener una reserva por ID
export const getReservaById = async (reserva_id) => {
  try {
    const res = await api.get(`/reservas/${reserva_id}`);
    return res.data;
  } catch (error) {
    console.error("Error en getReservaById:", error.response?.data || error.message);
    throw error;
  }
};

// Crear reserva
export const createReserva = async (data) => {
  try {
    const res = await api.post("/reservas", data);
    return res.data;
  } catch (error) {
    console.error("Error en createReserva:", error.response?.data || error.message);
    throw error;
  }
};

// Actualizar reserva
export const updateReserva = async (reserva_id, data) => {
  try {
    const res = await api.patch(`/reservas/${reserva_id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error en updateReserva:", error.response?.data || error.message);
    throw error;
  }
};

// Eliminar reserva
export const deleteReserva = async (reserva_id) => {
  try {
    await api.delete(`/reservas/${reserva_id}`);
  } catch (error) {
    console.error("Error en deleteReserva:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener todas las reservas de un usuario
export const getReservasByUsuario = async (usuario_id) => {
  try {
    const response = await api.get(`/reservas/usuario/${usuario_id}`);
    return response.data;
  } catch (error) {
    console.error("Error en getReservasByUsuario:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
