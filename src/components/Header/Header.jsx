import React, { useContext, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../api/axios';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';
import logoImg from '../../images/logo.png';
import logoTablet from '../../images/logo-tablet.png';
import logoDesktop from '../../images/logo-desktop.png';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Header = () => {
  const { t } = useTranslation();
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({
    query: '(min-width: 768px) and (max-width: 1279px)',
  });
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  const handleLogout = useCallback(async () => {
    try {
      const userName = auth.user ? auth.user.name : 'Unknown user';
      await axiosInstance.post('/auth/logout');
      setAuth({ token: null, isAuthenticated: false, user: null });
      console.log(`User ${userName} logged out successfully`);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }, [auth.user, setAuth]);

  const handleLogoClick = useCallback(async () => {
    if (auth.isAuthenticated) {
      await handleLogout();
    }
    navigate('/');
  }, [auth.isAuthenticated, handleLogout, navigate]);

  //* LOGO
  const renderLogo = () => {
    if (isMobile) {
      //* Mobil
      return (
        <img
          src={auth.isAuthenticated ? logoTablet : logoImg} //* Autentificat: logoTablet, Neautentificat: logoImg
          alt="Logo"
          className={auth.isAuthenticated ? styles.logoTablet : styles.logoImg}
        />
      );
    } else if (isTablet) {
      //* Tabletă
      return (
        <img src={logoTablet} alt="Logo Tablet" className={styles.logoTablet} />
      );
    } else if (isDesktop) {
      //* Desktop
      return (
        <img
          src={logoDesktop}
          alt="Logo Desktop"
          className={styles.logoDesktop}
        />
      );
    }
  };

  //* NavLinks
  const renderNavLinks = () => {
    if (auth.isAuthenticated) {
      //* Autentificat
      return isDesktop ? (
        //* Desktop
        <>
          <span className={styles.verticalLineDesktop}></span>
          <Link to="/diary" className={styles.link}>
            {t('diary')}
          </Link>
          <Link to="/calculator" className={styles.link}>
            {t('calculator')}
          </Link>
          <div className={styles.userSection}>
            <span className={styles.user}>{auth.user.name}</span>
            <span className={styles.verticalLine}></span>
            <button onClick={handleLogout} className={styles.button}>
              {t('exit')}
            </button>
          </div>
        </>
      ) : isTablet ? (
        //* Tabletă
        <>
          <div className={styles.userSection}>
            <span className={styles.user}>{auth.user.name}</span>
            <span className={styles.verticalLine}></span>
            <button onClick={handleLogout} className={styles.button}>
              {t('exit')}
            </button>
          </div>
          <div className={styles.burgerContainer}>
            <BurgerMenu />
          </div>
        </>
      ) : (
        //* Mobil
        <>
          <div className={styles.burgerContainer}>
            <BurgerMenu />
          </div>
        </>
      );
    } else {
      //* Neautentificat
      return (
        <>
          <span className={styles.verticalLineDesktop}></span>
          <Link to="/login" className={styles.link}>
            {t('log_in')}
          </Link>
          <Link to="/registration" className={styles.link}>
            {t('registration')}
          </Link>
        </>
      );
    }
  };

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (auth.isAuthenticated) {
        await handleLogout();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [auth.isAuthenticated, handleLogout]); //* Re-run if auth.isAuthenticated or handleLogout changes

  return (
    <>
      <header className={styles.header}>
        <div
          className={styles.logo}
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        >
          {renderLogo()}
        </div>
        <nav className={styles.nav}>{renderNavLinks()}</nav>
      </header>
      {isMobile &&
        auth.isAuthenticated && ( //* Mobil + Autentificat
          <section className={styles.userSectionMobile}>
            <button
              className={styles.backButton}
              onClick={() => window.history.back()}
            ></button>
            <div className={styles.userContainer}>
              <span className={styles.user}>{auth.user.name}</span>
              <span className={styles.verticalLine}></span>
              <button onClick={handleLogout} className={styles.button}>
                {t('exit')}
              </button>
            </div>
          </section>
        )}
    </>
  );
};

export default Header;
