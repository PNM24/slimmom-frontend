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
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await register({ name, email, password });
      setIsRegistered(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await verifyOTP({ email, otp });
      setAuth({ token: data.token, isAuthenticated: true, user: data.user });
      navigate('/calculator');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await resendOTP({ email });
      alert('New verification code sent successfully');
    } catch (err) {
      setError(err.message);
    }
  };

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
            Please enter the verification code sent to {email}
          </p>
          <label className={styles.label}>
            Verification Code *
            <input
              type="text"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className={styles.input}
              maxLength={6}
              required
            />
          </label>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className={styles.buttonContainer}>
            <Button 
              type="submit" 
              text={loading ? "Verifying..." : "Verify Code"} 
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
        <label className={styles.label}>
          Name *
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Email *
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Password *
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className={styles.buttonContainer}>
          <Button 
            type="submit" 
            text={loading ? "Registering..." : "Register"} 
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