import React, { useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../api/axios';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';
import logoImg from '../../images/logo.png';
import logoTablet from '../../images/logo-tablet.png';
import logoDesktop from '../../images/logo-desktop.png';

const Header = () => {
  const { t } = useTranslation(); // Pentru traduceri
  const { auth, setAuth } = useContext(AuthContext); // Starea autentificării
  const navigate = useNavigate(); // Navigare programatică
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1279px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  // Funcție pentru logout
  const handleLogout = useCallback(async () => {
    try {
      const userName = auth.user ? auth.user.name : 'Unknown user';
      await axiosInstance.post('/auth/logout'); // Endpoint pentru logout
      setAuth({ token: null, isAuthenticated: false, user: null });
      alert(`User ${userName} logged out successfully`);
      navigate('/login'); // Navigare către pagina de login
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Failed to logout. Please try again.');
    }
  }, [auth.user, setAuth, navigate]);

  // Funcție pentru afișarea logo-ului bazată pe dimensiunea ecranului
  const renderLogo = () => {
    if (isMobile) {
      return <img src={logoImg} alt="Logo" className={styles.logoImg} />;
    } else if (isTablet) {
      return <img src={logoTablet} alt="Logo Tablet" className={styles.logoTablet} />;
    } else if (isDesktop) {
      return <img src={logoDesktop} alt="Logo Desktop" className={styles.logoDesktop} />;
    }
  };

  // Funcție pentru afișarea link-urilor de navigare bazate pe autentificare
  const renderNavLinks = () => {
    if (auth.isAuthenticated) {
      return (
        <>
          <Link to="/diary" className={styles.link}>{t('diary')}</Link>
          <Link to="/calculator" className={styles.link}>{t('calculator')}</Link>
          <button onClick={handleLogout} className={styles.button}>{t('exit')}</button>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login" className={styles.link}>{t('log_in')}</Link>
          <Link to="/registration" className={styles.link}>{t('registration')}</Link>
        </>
      );
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>{renderLogo()}</div>
      <nav className={styles.nav}>{renderNavLinks()}</nav>
    </header>
  );
};

export default Header;
