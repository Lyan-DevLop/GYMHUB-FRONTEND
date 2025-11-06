import React from 'react';
import Footer from './footer';
import PropTypes from 'prop-types';
import NavBar from './navbar';

const Layout = ({ children, className = '', skipFooter = false }) => {

  const darkMode = false; // Cambia a true si quieres forzar modo oscuro

  const themeClass = darkMode ? 'theme-dark' : 'theme-light';
  const layoutClasses = `layout ${className}`.trim();

  return (
    <div className={themeClass} data-theme={darkMode ? 'dark' : 'light'}>
      <div className={layoutClasses}>
        <NavBar />

        <main 
          className="main-content" 
          role="main"
          id="main-content"
          tabIndex="-1"
        >
          {children}
        </main>

        {!skipFooter && <Footer />}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  skipFooter: PropTypes.bool,
};

Layout.defaultProps = {
  className: '',
  skipFooter: false,
};

export default Layout;
