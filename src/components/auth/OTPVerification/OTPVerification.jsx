import React, { useState } from 'react';
import styles from './OTPVerification.module.css';

const OTPVerification = ({ email, onVerificationSuccess }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        onVerificationSuccess(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('New verification code sent successfully');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.verificationForm}>
        <h2>Verify Your Email</h2>
        <p>Please enter the verification code sent to {email}</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter verification code"
            maxLength={6}
            className={styles.input}
          />

          {error && <div className={styles.error}>{error}</div>}

          <button 
            type="submit" 
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>

          <button
            type="button"
            onClick={handleResendOTP}
            className={styles.resendButton}
          >
            Resend Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;