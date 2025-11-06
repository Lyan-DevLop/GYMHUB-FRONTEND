import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';
import Swal from 'sweetalert2';
import { registerUser, getRoles } from '../services/authService'; 
import '../styles/login.css';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    rol_id: ''
  });
  const [roles, setRoles] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Cargar roles al montar el componente
  useEffect(() => {
    const cargarRoles = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);
        // Si hay roles disponibles, seleccionar el primero por defecto
        if (rolesData.length > 0) {
          setFormData(prev => ({ ...prev, rol_id: rolesData[0].rol_id }));
        }
      } catch (error) {
        console.error('Error al cargar roles:', error);
        // Si falla, usar rol de cliente por defecto (2)
        setFormData(prev => ({ ...prev, rol_id: 2 }));
      }
    };

    cargarRoles();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden'
      });
      return;
    }

    if (formData.password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña debe tener al menos 6 caracteres'
      });
      return;
    }

    if (!formData.rol_id) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor selecciona un tipo de usuario'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser({
        nombre_usuario: formData.nombre,
        correo: formData.email,
        contrasena: formData.password,
        rol_id: parseInt(formData.rol_id)
      });

      if (response.nombre_usuario) {
        // Auto-login después del registro
        const userData = {
          name: response.nombre_usuario,
          role: response.rol?.nombre || "Usuario",
          usuario_id: response.usuario_id,
          email: response.correo,
          rol_id: response.rol_id
        };
        localStorage.setItem("user", JSON.stringify(userData));
        
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Tu cuenta ha sido creada correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/home');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.message || 'Error al crear la cuenta'
        });
      }
    } catch (error) {
      console.error('Error en registro:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al registrar tu cuenta'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <div className="auth-icon">
            <UserPlus size={32} />
          </div>
          <h1 className="auth-title">Crear Cuenta</h1>
          <p className="auth-subtitle">Únete a GymHub hoy mismo</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">
              <User size={16} />
              Nombre Completo
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="form-input"
              placeholder="Juan Pérez"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rol_id" className="form-label">
              <User size={16} />
              Tipo de Usuario
            </label>
            <select
              id="rol_id"
              name="rol_id"
              value={formData.rol_id}
              onChange={handleChange}
              className="form-input"
              required
            >
              {roles.map((rol) => (
                <option key={rol.rol_id} value={rol.rol_id}>
                  {rol.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <Mail size={16} />
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <Lock size={16} />
              Contraseña
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              <Lock size={16} />
              Confirmar Contraseña
            </label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            className="auth-button"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <span className="loading-text">
                <div className="spinner"></div>
                Creando cuenta...
              </span>
            ) : (
              <>
                <UserPlus size={20} />
                Crear Cuenta
              </>
            )}
          </motion.button>
        </form>

        <div className="auth-footer">
          <p className="auth-text">
            ¿Ya tienes una cuenta? 
            <Link to="/login" className="auth-link">
              <LogIn size={16} />
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}