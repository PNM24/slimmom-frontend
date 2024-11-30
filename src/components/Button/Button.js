import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({
  type = 'button',
  text,
  handlerFunction,
  variant,
  size,
  isDisabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={handlerFunction}
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  text: PropTypes.string.isRequired,
  handlerFunction: PropTypes.func,
  variant: PropTypes.string,
  size: PropTypes.oneOf(['size210', 'size180', 'round48']),
  isDisabled: PropTypes.bool,
};

export default Button;
