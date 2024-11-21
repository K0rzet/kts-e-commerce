import React from 'react';
import * as styles from './CheckBox.module.scss';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ 
  onChange, 
  checked = false,
  disabled,
  className,
  ...props 
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.checked);
    }
  };

  return (
    <label
      className={`${styles.container} ${className || ''}`}
      data-disabled={disabled}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={styles.input}
        {...props}
      />
      <div className={styles.checkbox}>
        {checked && (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.checkIcon}
          >
            <path
              d="M6.66663 19.3548L16.4625 30L33.3333 11.6667"
              stroke="currentColor"
              strokeWidth="3.33333"
            />
          </svg>
        )}
      </div>
    </label>
  );
};

export default CheckBox;
