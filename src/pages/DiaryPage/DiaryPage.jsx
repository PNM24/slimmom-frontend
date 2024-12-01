// src/components/DiaryPage/DiaryPage.jsx
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import DiaryDateCalendar from 'components/DiaryDateCalendar/DiaryDateCalendar';
import DiaryProductsList from 'components/DiaryProductsList/DiaryProductsList';
import Header from 'components/Header/Header';
import Button from 'components/Button/Button';
import Summary from 'components/Summary/Summary';
import DiaryAddProductForm from 'components/DiaryAddProductForm/DiaryAddProductForm';
import { AuthContext } from '../../context/AuthContext';
import { ConsumedProductsContext } from '../../context/ConsumedProductsContext';
import styles from './DiaryPage.module.css';

const DiaryPage = () => {
  const { auth } = useContext(AuthContext);
  const { consumedProducts, setConsumedProducts } = useContext(
    ConsumedProductsContext
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const isTabletOrDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  useEffect(() => {
    if (auth.isAuthenticated) {
      const fetchConsumedProducts = async () => {
        try {
          const response = await axios.get(
            'http://localhost:3000/api/products/day-info',
            {
              params: { date: selectedDate.toISOString() },
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );
          const consumedProducts = response.data.consumedProducts.map(cp => ({
            ...cp.productId,
            grams: cp.quantity,
            consumedProductId: cp._id,
          }));
          setConsumedProducts(consumedProducts);
        } catch (error) {
          console.error('Error fetching consumed products:', error);
        }
      };

      fetchConsumedProducts();
    }
  }, [selectedDate, auth.isAuthenticated, auth.token, setConsumedProducts]);

  const handleAddProductPage = () => {
    if (!isTabletOrDesktop) {
      navigate('/add-product');
    }
  };

  const handleSaveProduct = async product => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/products/consumed',
        {
          productId: product._id,
          date: selectedDate,
          quantity: product.grams,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setConsumedProducts(prevProducts => [
        ...prevProducts,
        {
          ...product,
          _id: response.data._id,
          consumedProductId: response.data._id,
        },
      ]);
    } catch (error) {
      console.error('Error saving consumed product:', error);
    }
  };

  const handleDeleteProduct = async productId => {
    try {
      await axios.delete(
        `http://localhost:3000/api/products/consumed/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setConsumedProducts(prevProducts =>
        prevProducts.filter(product => product.consumedProductId !== productId)
      );
    } catch (error) {
      console.error('Error deleting consumed product:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <Header />
        <section className={styles.addSection}>
          <DiaryDateCalendar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          {isTabletOrDesktop && (
            <div className={styles.addForm}>
              <DiaryAddProductForm onSave={handleSaveProduct} />
            </div>
          )}
          <DiaryProductsList
            products={consumedProducts}
            onDelete={handleDeleteProduct}
          />
          {!isTabletOrDesktop && (
            <div className={styles.mobileButtonWrapper}>
              <Button
                type="button"
                text="+"
                handlerFunction={handleAddProductPage}
                variant="colorButton"
                size="round48"
              />
            </div>
          )}
        </section>
      </div>
      <div className={styles.summarySection}>
        <Summary selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default DiaryPage;
