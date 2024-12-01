import React from 'react';
import CalorieForm from 'components/CalorieForm/CalorieForm';
import Header from 'components/Header/Header';
import Summary from 'components/Summary/Summary';
import styles from './Calculator.module.css';

const Calculator = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <Header />
        <CalorieForm />
      </div>
      <div className={styles.summarySection}>
        <Summary />
      </div>
    </div>
  );
};

export default Calculator;
