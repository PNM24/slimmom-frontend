import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationPage.module.css';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import { register, verifyOTP, resendOTP } from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  // Funcție pentru resetarea mesajelor de eroare și succes
  const handleInputChange = setter => e => {
    setter(e.target.value);
    setError('');
    setSuccessMessage('');
  };

  // Funcție pentru înregistrare
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!name || !email || !password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      await register({ name, email, password });
      setIsRegistered(true);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Funcție pentru verificarea OTP
  const handleVerifyOTP = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await verifyOTP({ email, otp });
      setAuth({ token: data.token, isAuthenticated: true, user: data.user });
      navigate('/calculator');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Funcție pentru trimiterea din nou a OTP
  const handleResendOTP = async () => {
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await resendOTP({ email });
      setSuccessMessage('New verification code sent successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to resend code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Funcție pentru navigarea la login
  const handleLogin = () => {
    navigate('/login');
  };

  if (isRegistered) {
    return (
      <div className={`${styles.container} ${styles.background}`}>
        <Header />
        <h2 className={styles.title}>VERIFY EMAIL</h2>
        <form onSubmit={handleVerifyOTP} className={styles.form}>
          <p className={styles.verificationText}>
            Please enter the verification code sent to {email}.
          </p>
          <label htmlFor="otp" className={styles.label}>
            Verification Code *
          </label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={handleInputChange(setOtp)}
            className={styles.input}
            maxLength={6}
            required
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          <div className={styles.buttonContainer}>
            <Button
              type="submit"
              text={loading ? 'Verifying...' : 'Verify Code'}
              variant="colorButton"
              disabled={loading}
            />
            <Button
              type="button"
              text="Resend Code"
              variant="whiteButton"
              handlerFunction={handleResendOTP}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${styles.background}`}>
      <Header />
      <h2 className={styles.title}>REGISTER</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name" className={styles.label}>
          Name *
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleInputChange(setName)}
          className={styles.input}
          required
        />
        <label htmlFor="email" className={styles.label}>
          Email *
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleInputChange(setEmail)}
          className={styles.input}
          required
        />
        <label htmlFor="password" className={styles.label}>
          Password *
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handleInputChange(setPassword)}
          className={styles.input}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            text={loading ? 'Registering...' : 'Register'}
            variant="colorButton"
            disabled={loading}
          />
          <Button
            type="button"
            text="Log in"
            variant="whiteButton"
            handlerFunction={handleLogin}
          />
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
