import React from 'react';
import * as styles from './Menu.module.scss';
import { menuData, getMenuIconsData } from './menu.data';
import MenuItem from './MenuItem';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

const Menu = observer(() => {
  const currentUrl = useLocation();
  const menuIconsData = getMenuIconsData();

  return (
    <div className={styles.menuContainer}>
      <Logo />
      <ul className={styles.menu}>
        {menuData.map((item) => (
          <MenuItem key={item.id} title={item.title} path={item.path} isActive={currentUrl.pathname === item.path} />
        ))}
      </ul>
      <ul className={styles.menuIcons}>
        {menuIconsData.map((item) => (
          <li key={item.id}>
            <Link to={item.path} className={classNames({ [styles.active]: currentUrl.pathname === item.path, [styles.menuIconLink]: true })}>
              {React.createElement(item.element)}
              <span>{item.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Menu;
