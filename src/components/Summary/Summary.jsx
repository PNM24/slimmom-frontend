import React, { useContext } from 'react';
import styles from './Summary.module.css';
import { CalorieInfoContext } from '../../context/CalorieInfoContext';
import { ConsumedProductsContext } from '../../context/ConsumedProductsContext';
import { format, isValid } from 'date-fns';
import { useTranslation } from 'react-i18next';

const Summary = ({ selectedDate }) => {
  const { t } = useTranslation();
  const { calorieInfo } = useContext(CalorieInfoContext);
  const { consumedProducts } = useContext(ConsumedProductsContext);

  // Setăm data curentă ca dată implicită
  const currentDate = new Date();
  const validSelectedDate = isValid(selectedDate) ? selectedDate : currentDate;

  const totalConsumedCalories = consumedProducts.reduce((total, product) => {
    return total + (product.calories * product.grams) / product.weight;
  }, 0);

  const formattedDate = format(validSelectedDate, 'EEEE dd MMM yyyy');

  const consumedPercentage = calorieInfo
    ? (totalConsumedCalories / calorieInfo.dailyRate) * 100
    : 0;

  return (
    <div className={styles.container}>
      <section className={styles.dailyRate}>
        {calorieInfo ? (
          <div>
            <p className={styles.title}>
              {t('summary')} {formattedDate}
            </p>
            <p className={styles.summary}>
              {t('left')}{' '}
              {Math.round(calorieInfo.dailyRate - totalConsumedCalories)} kcal
            </p>
            <p className={styles.summary}>
              {t('consumed')} {Math.round(totalConsumedCalories)} kcal
            </p>
            <p className={styles.summary}>
              {t('daily_rate')} {calorieInfo.dailyRate} kcal
            </p>
            <p className={styles.summary}>
              {Math.round(consumedPercentage)}% {t('percent_normal')}
            </p>
          </div>
        ) : (
          <p>{t('no_data_available')}</p>
        )}
      </section>

      <section className={styles.notRec}>
        <p className={styles.title}>{t('food_not_recommended')}</p>
        {calorieInfo &&
        calorieInfo.notRecommendedFoods &&
        calorieInfo.notRecommendedFoods.length > 0 ? (
          <ul className={styles.list}>
            {calorieInfo.notRecommendedFoods.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        ) : (
          <p>{t('no_foods_not_recommended')}</p>
        )}
      </section>
    </div>
  );
};

export default Summary;
