import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationPage.module.css';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import { register } from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!name.trim()) return 'Name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email format';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await register({ name, email, password });
      if (data) {
        alert(data.message || 'Registration successful!');
        navigate('/verify-otp', { state: { email } });
      }
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

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
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Email *
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Password *
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            text={isLoading ? 'Registering...' : 'Register'}
            variant="colorButton"
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
