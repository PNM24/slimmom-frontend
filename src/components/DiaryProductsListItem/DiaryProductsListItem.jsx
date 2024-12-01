import React from 'react';
import styles from './DiaryProductsListItem.module.css';

const DiaryProductsListItem = ({ product, onDelete }) => {
  const calories = (product.grams * product.calories) / 100;

  return (
    <li className={styles.item}>
      <span className={styles.product}>{product.title}</span>
      <span className={styles.grams}>{product.grams} g</span>
      <span className={styles.calorie}>{Math.round(calories)} kcal</span>{' '}
      {/* Afișăm caloriile calculate */}
      <button type="button" className={styles.deleteButton} onClick={onDelete}>
        &times;
      </button>
    </li>
  );
};

export default DiaryProductsListItem;
