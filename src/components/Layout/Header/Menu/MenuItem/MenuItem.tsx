import React from 'react';
import * as styles from './MenuItem.module.scss';
import { Link } from 'react-router-dom';
import Text from '@/components/Text';
import classNames from 'classnames';

interface MenuItemProps {
  title: string;
  path: string;
  isActive?: boolean;
}

const MenuItem = ({ title, path, isActive }: MenuItemProps) => {
  return (
    <li>
      <Link 
        className={classNames(styles.menuItem, {
          [styles.isActive]: isActive
        })} 
        to={path}
      >
        <Text
          tag="span"
          view="p-18"
          color={isActive ? 'accent' : 'primary'}
          weight={isActive ? 'semiBold' : 'normal'}
        >
          {title}
        </Text>
      </Link>
    </li>
  );
};

export default MenuItem;
