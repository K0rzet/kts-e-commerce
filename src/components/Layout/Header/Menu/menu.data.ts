import CartIcon from '../components/CartIcon';
import UserIcon from '../components/UserIcon';

export const menuData = [
  {
    id: 1,
    title: 'Products',
    path: '/products',
  },
  {
    id: 2,
    title: 'Categories',
    path: '/categories',
  },
  {
    id: 3,
    title: 'About Us',
    path: '/about-us',
  },
];
export const menuIconsData = [
  {
    id: 1,
    path: '/cart',
    element: CartIcon,
    description: 'Cart',
  },
  {
    id: 2,
    path: '/login',
    element: UserIcon,
    description: 'Profile',
  },
];
