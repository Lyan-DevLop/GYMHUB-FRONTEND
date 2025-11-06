import React from 'react'
import '../styles/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>Calle 45 #12-34, Palmira, Colombia</p>
          <p>Teléfono: +57 311 456 7890</p>
          <p>Email: contacto@gymhub.com</p>
        </div>

        <div className="footer-section">
          <h3>Horarios</h3>
          <p>Lunes a Viernes: 5:00 a.m. - 10:00 p.m.</p>
          <p>Sábados: 6:00 a.m. - 12:00 p.m.</p>
        </div>

        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <a href="/planes">Planes y Membresías</a>
          <a href="/entrenadores">Nuestros Entrenadores</a>
          <a href="/blog">Consejos Fitness</a>
          <a href="/contacto">Únete Ahora</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Gym Hub. Todos los derechos reservados.</p>
        <p>Transforma tu cuerpo, supera tus límites.</p>
      </div>
    </footer>
  )
}

export default Footer
