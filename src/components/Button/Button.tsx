import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import Loader from '@/components/Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = React.memo(({ 
  children, 
  className, 
  loading, 
  disabled,
  onClick,
  ...restProps 
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) return;
    onClick?.(e);
  };

  return (
    <button
      className={classNames(
        styles.button,
        { [styles.loading]: loading },
        { [styles.loadingAndDisabled]: loading && disabled },
        className
      )}
      disabled={disabled || loading}
      onClick={handleClick}
      {...restProps}
    >
      {loading && (
        <div data-testid="loader">
          <Loader 
            size="s" 
            className={styles.loader}
          />
        </div>
      )}
      <span className={styles.text}>{children}</span>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
