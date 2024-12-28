import React from 'react';
import Header from '../../components/Header/Header';
import CalorieForm from '../../components/CalorieForm/CalorieForm';
import styles from './HomePage.module.css';
import LanguageSwitcher from 'components/LanguageSwitcher/LanguageSwitcher';

const HomePage = () => {
  return (
    <div className={`${styles.container} ${styles.background}`}>
      <Header />
      <div className={styles.languageSwitcher}>
        <LanguageSwitcher />
      </div>
      <div className={styles.calorieForm}>
        <CalorieForm />
      </div>
    </div>
  );
};

export default HomePage;