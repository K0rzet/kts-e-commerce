import React from 'react';
import * as styles from './Input.module.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, disabled, className, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <div 
        className={`${styles.container} ${className || ''}`}
        data-disabled={disabled}
      >
        <input
          {...props}
          type="text"
          ref={ref}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={styles.input}
        />
        {afterSlot && <div className={styles.afterSlot}>{afterSlot}</div>}
      </div>
    );
  }
);

export default Input;
