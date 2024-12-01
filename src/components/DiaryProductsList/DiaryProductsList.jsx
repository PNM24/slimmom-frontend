import React from 'react';
import DiaryProductsListItem from '../DiaryProductsListItem/DiaryProductsListItem';
import styles from './DiaryProductsList.module.css';

const DiaryProductsList = ({ products, onDelete }) => {
  return (
    <ul className={styles.list}>
      {products.map(product => (
        <DiaryProductsListItem
          key={product.consumedProductId}
          product={product}
          onDelete={() => onDelete(product.consumedProductId)}
        />
      ))}
    </ul>
  );
};

export default DiaryProductsList;
