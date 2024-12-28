import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './OTPVerification.module.css';
import Button from 'components/Button/Button';
import axiosInstance from '../../api/axios';

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ''; // Obține email-ul din state-ul navigației
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError('OTP is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/auth/verify-otp', { email, otp });
      alert('OTP verified successfully!');
      navigate('/login'); // Navighează utilizatorul la login după verificare
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.container} ${styles.background}`}>
      <h2 className={styles.title}>Verify OTP</h2>
      <form onSubmit={handleVerifyOTP} className={styles.form}>
        <p className={styles.instructions}>Enter the OTP sent to your email: {email}</p>
        <label className={styles.label}>
          OTP *
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            text={isLoading ? 'Verifying...' : 'Verify OTP'}
            variant="colorButton"
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default OTPVerification;
