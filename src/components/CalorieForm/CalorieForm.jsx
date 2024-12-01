import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './CalorieForm.module.css';
import { BloodTypeContext } from '../../context/BloodTypeContext';
import { getDailyIntake } from '../../api/products';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { Loader } from '../loader';
import { startLoading, stopLoading } from '../../redux/actions';
import { AuthContext } from '../../context/AuthContext';
import { CalorieInfoContext } from '../../context/CalorieInfoContext';
import { saveCalorieInfo } from '../../api/calorieInfo';

const CalorieForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    height: '',
    age: '',
    currentWeight: '',
    desireWeight: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recCalories, setRecCalories] = useState(null);
  const [forbiddenFoods, setForbiddenFoods] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loader.loading);
  const navigate = useNavigate();
  const { bloodType, setBloodType } = useContext(BloodTypeContext);
  const { auth, setAuth } = useContext(AuthContext);
  const { setCalorieInfo } = useContext(CalorieInfoContext);

  useEffect(() => {
    if (auth.calorieInfo) {
      setFormData({
        height: auth.calorieInfo.height,
        age: auth.calorieInfo.age,
        currentWeight: auth.calorieInfo.currentWeight,
        desireWeight: auth.calorieInfo.desireWeight,
      });
      setBloodType(auth.calorieInfo.bloodType);
      setRecCalories(auth.calorieInfo.dailyRate);
      setForbiddenFoods(auth.calorieInfo.notRecommendedFoods);
    }
  }, [auth.calorieInfo, setBloodType]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(startLoading());
    try {
      const params = {
        weight: formData.currentWeight,
        height: formData.height,
        age: formData.age,
        bloodType: bloodType,
      };

      const data = await getDailyIntake(params);
      setRecCalories(data.dailyKcal);
      setForbiddenFoods(data.notRecommendedProducts);

      if (auth.isAuthenticated) {
        await saveCalorieData(data.dailyKcal, data.notRecommendedProducts);
        setIsModalOpen(false);
        navigate('/calculator');
      } else {
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleStartLosingWeight = () => {
    setIsModalOpen(false);
    navigate('/registration');
  };

  const saveCalorieData = async (dailyKcal, notRecommendedProducts) => {
    const calorieInfo = {
      height: formData.height,
      age: formData.age,
      currentWeight: formData.currentWeight,
      desireWeight: formData.desireWeight,
      bloodType: bloodType,
      dailyRate: dailyKcal,
      notRecommendedFoods: notRecommendedProducts.map(food => food.title) || [],
    };

    await saveCalorieInfo(calorieInfo);
    setCalorieInfo(calorieInfo);

    setAuth(prevAuth => ({
      ...prevAuth,
      calorieInfo: calorieInfo,
    }));
  };

  return (
    <>
      {loading && <Loader />}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.title}>{t('calculate_daily_intake')}</div>

        <div className={styles.twoColumns}>
          <section>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                {t('height')} *
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </label>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                {t('age')} *
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </label>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                {t('current_weight')} *
                <input
                  type="number"
                  name="currentWeight"
                  value={formData.currentWeight}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </label>
            </div>
          </section>

          <section>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                {t('desired_weight')} *
                <input
                  type="number"
                  name="desireWeight"
                  value={formData.desireWeight}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </label>
            </div>

            <div className={styles.formGroup}>
              <span className={styles.label}>{t('blood_type')} *</span>
              <div className={styles.divider}></div>
              <div className={styles.radioGroup}>
                <label className={styles.label}>
                  <input
                    type="radio"
                    name="bloodType"
                    value="1"
                    checked={bloodType === '1'}
                    onChange={e => setBloodType(e.target.value)}
                    required
                  />
                  <span>0</span>
                </label>
                <label className={styles.label}>
                  <input
                    type="radio"
                    name="bloodType"
                    value="2"
                    checked={bloodType === '2'}
                    onChange={e => setBloodType(e.target.value)}
                    required
                  />
                  <span>A</span>
                </label>
                <label className={styles.label}>
                  <input
                    type="radio"
                    name="bloodType"
                    value="3"
                    checked={bloodType === '3'}
                    onChange={e => setBloodType(e.target.value)}
                    required
                  />
                  <span>B</span>
                </label>
                <label className={styles.label}>
                  <input
                    type="radio"
                    name="bloodType"
                    value="4"
                    checked={bloodType === '4'}
                    onChange={e => setBloodType(e.target.value)}
                    required
                  />
                  <span>AB</span>
                </label>
              </div>
            </div>
          </section>
        </div>

        <Button
          type="submit"
          text={t('start_losing_weight')}
          variant="colorButton"
        />
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className={styles.modalTitle}>{t('recommended_calorie_intake')}</h2>
        <p className={styles.calorieContainer}>
          <span className={styles.calorieNumber}>{recCalories}</span>
          <span className={styles.calorieUnit}> kcal</span>
        </p>
        <div className={styles.dividerLine}></div>
        <h3 className={styles.modalSubtitle}>{t('foods_not_eat')}</h3>
        <ol className={styles.forbiddenFoodsList}>
          {forbiddenFoods.map((food, index) => (
            <li key={food._id || index}>{food.title}</li>
          ))}
        </ol>
        <div className={styles.modalButtonContainer}>
          <Button
            type="button"
            text={t('start_losing_weight')}
            variant="colorButton"
            handlerFunction={handleStartLosingWeight}
          />
        </div>
      </Modal>
    </>
  );
};

export default CalorieForm;
