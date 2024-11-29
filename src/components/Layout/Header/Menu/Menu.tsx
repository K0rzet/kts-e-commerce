import React from 'react';
import * as styles from './Menu.module.scss';
import { getMenuIconsData } from './menu.data';
import MenuItem from './MenuItem';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import ThemeSwitcher from '../components/ThemeSwitcher/ThemeSwitcher';

const Menu = observer(() => {
  const currentUrl = useLocation();
  const menuIconsData = getMenuIconsData();

  return (
    <div className={styles.menuContainer}>
      <Logo />
      <ul className={styles.menuIcons}>
        <li className={styles.themeSwitcher}>
          <ThemeSwitcher />
        </li>
        {menuIconsData.map((item) => (
          <li key={item.id}>
            <Link
              to={item.path}
              className={classNames({
                [styles.active]: currentUrl.pathname === item.path,
                [styles.menuIconLink]: true,
              })}
            >
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
