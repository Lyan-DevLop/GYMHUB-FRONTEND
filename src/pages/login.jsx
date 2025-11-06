import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import Swal from 'sweetalert2';
import { loginUser } from '../services/authService';
import '../styles/login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser({
        correo: formData.email,
        contrasena: formData.password
      });
      
      if (response.message === "Login correcto") {
        // Guardar usuario con formato estándar para el navbar
        const userData = {
          name: response.usuario.nombre_usuario,
          role: response.usuario.rol?.nombre || "Usuario",
          usuario_id: response.usuario.usuario_id,
          email: response.usuario.correo
        };
        localStorage.setItem("user", JSON.stringify(userData));
        
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Has iniciado sesión correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/home');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.message || 'Credenciales incorrectas'
        });
      }
    } catch (error) {
      console.error('Error en login:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al iniciar sesión'
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
            <LogIn size={32} />
          </div>
          <h1 className="auth-title">Iniciar Sesión</h1>
          <p className="auth-subtitle">Bienvenido de vuelta a GymHub</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
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
                Iniciando sesión...
              </span>
            ) : (
              <>
                <LogIn size={20} />
                Iniciar Sesión
              </>
            )}
          </motion.button>
        </form>

        <div className="auth-footer">
          <p className="auth-text">
            ¿No tienes una cuenta? 
            <Link to="/register" className="auth-link">
              <UserPlus size={16} />
              Regístrate aquí
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}