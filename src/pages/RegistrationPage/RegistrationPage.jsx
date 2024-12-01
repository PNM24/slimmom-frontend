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
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await register({ name, email, password });
      setAuth({ token: data.token, isAuthenticated: true, user: data.user });
      console.log('Registered user name:', data.user.name);
      navigate('/calculator');
    } catch (err) {
      setError(err.message);
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
          <Button type="submit" text="Register" variant="colorButton" />
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
