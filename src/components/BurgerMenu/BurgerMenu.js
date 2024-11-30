import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './BurgerMenu.module.css';

const BurgerMenu = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.burgerMenu}>
      <button onClick={toggleMenu} className={styles.burgerButton}>
        &#9776; {/* Unicode character for burger icon */}
      </button>
      {isOpen && (
        <div className={styles.menu}>
          <Link to="/diary" className={styles.link} onClick={toggleMenu}>
            {t('diary')}
          </Link>
          <Link to="/calculator" className={styles.link} onClick={toggleMenu}>
            {t('calculator')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
