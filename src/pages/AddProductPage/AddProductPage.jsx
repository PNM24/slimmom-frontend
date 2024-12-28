import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from 'components/Header/Header';
import DiaryAddProductForm from 'components/DiaryAddProductForm/DiaryAddProductForm';
import { AuthContext } from '../../context/AuthContext';
import { ConsumedProductsContext } from '../../context/ConsumedProductsContext';
import styles from './AddProductPage.module.css';

const AddProductPage = () => {
  const { auth } = useContext(AuthContext);
  const { setConsumedProducts } = useContext(ConsumedProductsContext);
  const navigate = useNavigate();

  const handleSaveProduct = async (product) => {
    try {
      const response = await axios.post(
        '/api/products/consumed',
        {
          productId: product._id,
          date: new Date(),
          quantity: product.grams,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setConsumedProducts((prevProducts) => [
        ...prevProducts,
        {
          ...product,
          _id: response.data._id,
          consumedProductId: response.data._id,
        },
      ]);

      navigate('/diary');
    } catch (error) {
      console.error('Error saving consumed product:', error);
      alert('Failed to save product. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <DiaryAddProductForm
          onSave={handleSaveProduct}
          onClose={() => navigate('/diary')}
        />
      </div>
    </>
  );
};

export default AddProductPage;
