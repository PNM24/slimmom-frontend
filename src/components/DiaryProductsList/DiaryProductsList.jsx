import React from 'react';
import DiaryProductsListItem from '../DiaryProductsListItem/DiaryProductsListItem';
import styles from './DiaryProductsList.module.css';

const DiaryProductsList = ({ products, onDelete }) => {
  return (
    <div>
      {products.length > 0 ? (
        <ul className={styles.list}>
          {products.map((product) => (
            <DiaryProductsListItem
              key={product.consumedProductId}
              product={product}
              onDelete={() => onDelete(product.consumedProductId)}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.noProducts}>No products added for this day.</p>
      )}
    </div>
  );
};

export default DiaryProductsList;
