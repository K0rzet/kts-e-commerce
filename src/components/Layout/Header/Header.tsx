import React from 'react';
import Menu from './Menu';
import * as styles from './Header.module.scss';
const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Menu />
    </div>
  );
};

export default Header;
