import React, { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from './SearchInput.module.scss';

const SearchInput: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('search') || '');

  const handleSearch = useCallback(() => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (inputValue) {
        newParams.set('search', inputValue);
      } else {
        newParams.delete('search');
      }
      newParams.set('page', '1');
      return newParams;
    });
  }, [setSearchParams, inputValue]);

  return (
    <div className={styles.searchContainer}>
      <Input value={inputValue} onChange={setInputValue} placeholder="Search products..." />
      <Button onClick={handleSearch}>Find now</Button>
    </div>
  );
};
export default SearchInput;