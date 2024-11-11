import React, { useCallback, useEffect, useRef, useState } from 'react';
import Input from '../Input';
import styles from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option => 
    option.value.toLowerCase().includes(filter.toLowerCase())
  );

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleOptionClick = (option: Option) => {
    const isSelected = value.some(item => item.key === option.key);
    if (isSelected) {
      onChange(value.filter(item => item.key !== option.key));
    } else {
      onChange([...value, option]);
    }
  };

  const handleInputChange = (newFilter: string) => {
    setFilter(newFilter);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      setFilter('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const displayValue = value.length > 0 ? getTitle(value) : '';

  return (
    <div 
      ref={rootRef}
      className={`${styles.container} ${className || ''}`}
    >
      <Input
        value={isOpen ? filter : displayValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        disabled={disabled}
        placeholder={getTitle(value)}
        afterSlot={
          <div className={styles.arrow}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        }
      />
      {isOpen && !disabled && (
        <div className={styles.options}>
          {filteredOptions.map(option => (
            <div
              key={option.key}
              className={`${styles.option} ${
                value.some(item => item.key === option.key) ? styles.selected : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
