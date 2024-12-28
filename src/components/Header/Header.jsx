import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../api/axios';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';
import logoImg from '../../images/logo.png';
import logoTablet from '../../images/logo-tablet.png';
import logoDesktop from '../../images/logo-desktop.png';

const Header = () => {
  const { t } = useTranslation();
  const { auth, setAuth } = useContext(AuthContext);
<<<<<<< Updated upstream
=======
  const navigate = useNavigate();

>>>>>>> Stashed changes
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1279px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  const userName = auth?.user?.name || 'Guest';

  // Funcție de logout
  const handleLogout = useCallback(async () => {
    try {
      await axiosInstance.post('/api/auth/logout');
      setAuth({ token: null, isAuthenticated: false, user: null });
<<<<<<< Updated upstream
      alert(`User ${userName} logged out successfully`);
=======
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('User logged out successfully');
      navigate('/login');
>>>>>>> Stashed changes
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Failed to logout. Please try again.');
    }
  }, [setAuth, navigate]);

<<<<<<< Updated upstream
  const renderLogo = () => {
    if (isMobile) {
      return <img src={logoImg} alt="Logo" className={styles.logoImg} />;
    } else if (isTablet) {
      return <img src={logoTablet} alt="Logo Tablet" className={styles.logoTablet} />;
    } else if (isDesktop) {
      return <img src={logoDesktop} alt="Logo Desktop" className={styles.logoDesktop} />;
    }
  };

  const renderNavLinks = () => {
    if (auth.isAuthenticated) {
      return (
        <>
          <Link to="/diary" className={styles.link}>{t('diary')}</Link>
          <Link to="/calculator" className={styles.link}>{t('calculator')}</Link>
          <button onClick={handleLogout} className={styles.button}>{t('exit')}</button>
=======
  // Verifică datele din localStorage și actualizează starea
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setAuth(prevAuth => ({
          ...prevAuth,
          isAuthenticated: true,
          user: parsedUser,
        }));
      } catch (err) {
        console.error('Invalid user data in localStorage:', err);
        localStorage.removeItem('user');
      }
    }
  }, [setAuth]);

  // Logo în funcție de tipul de ecran
  const renderLogo = () => {
    if (isMobile) return <img src={logoImg} alt="Logo Mobile" className={styles.logoImg} />;
    if (isTablet) return <img src={logoTablet} alt="Logo Tablet" className={styles.logoTablet} />;
    if (isDesktop) return <img src={logoDesktop} alt="Logo Desktop" className={styles.logoDesktop} />;
  };

  // Link-urile de navigare
  const renderNavLinks = () => {
    if (auth?.isAuthenticated) {
      return (
        <>
          <span className={styles.verticalLineDesktop}></span>
          <Link to="/diary" className={styles.link}>{t('diary')}</Link>
          <Link to="/calculator" className={styles.link}>{t('calculator')}</Link>
          <div className={styles.userSection}>
            <span className={styles.user}>{userName}</span>
            <span className={styles.verticalLine}></span>
            <button onClick={handleLogout} className={styles.button}>{t('exit')}</button>
          </div>
          {isMobile && <BurgerMenu />}
>>>>>>> Stashed changes
        </>
      );
    } else {
      return (
        <>
<<<<<<< Updated upstream
=======
          <span className={styles.verticalLineDesktop}></span>
>>>>>>> Stashed changes
          <Link to="/login" className={styles.link}>{t('log_in')}</Link>
          <Link to="/registration" className={styles.link}>{t('registration')}</Link>
        </>
      );
    }
  };

  return (
    <header className={styles.header}>
<<<<<<< Updated upstream
      <div className={styles.logo}>{renderLogo()}</div>
=======
      <div className={styles.logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        {renderLogo()}
      </div>
>>>>>>> Stashed changes
      <nav className={styles.nav}>{renderNavLinks()}</nav>
    </header>
  );
};

export default Header;

