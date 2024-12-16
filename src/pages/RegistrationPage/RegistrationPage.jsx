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

  const handleSubmit = async e => {
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
      setAuth({ token: data.token, isAuthenticated: true, user: data.user });
      navigate('/calculator', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className={`${styles.container} ${styles.background}`}>
      <Header />
      <h2 className={styles.title}>REGISTER</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label} htmlFor="name">
  Name *
  <input
    id="name"
    type="text"
    value={name}
    onChange={e => setName(e.target.value)}
    className={styles.input}
    required
  />
</label>
<label className={styles.label} htmlFor="email">
  Email *
  <input
    id="email"
    type="email"
    value={email}
    onChange={e => setEmail(e.target.value)}
    className={styles.input}
    required
  />
</label>
<label className={styles.label} htmlFor="password">
  Password *
  <input
    id="password"
    type="password"
    value={password}
    onChange={e => setPassword(e.target.value)}
    className={styles.input}
    required
  />
</label>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={`${styles.button} ${styles.colorButton}`}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.whiteButton}`}
            onClick={handleLogin}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
