// src/components/Modal/Modal.js
import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const handleOutsideClick = useCallback(
    event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
        navigate('/diary');
      }
    },
    [onClose, navigate]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, handleOutsideClick]);

  useEffect(() => {
    const handleEscape = event => {
      if (event.keyCode === 27) {
        onClose();
        navigate('/diary');
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose, navigate]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button
            className={styles.closeButton}
            onClick={() => {
              onClose();
              navigate('/diary');
            }}
          >
            {/* Your close button content here */}
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
