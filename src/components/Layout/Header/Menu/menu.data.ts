import UserAvatar from '@/components/UserAvatar';
import CartIcon from '../components/CartIcon';
import UserIcon from '../components/UserIcon';
import { authStore } from '@/store/AuthStore';

export const getMenuIconsData = () => [
  {
    id: 1,
    path: '/cart',
    element: CartIcon,
    description: 'Cart',
  },
  {
    id: 2,
    path: authStore.accessToken ? '/profile' : '/login',
    element: authStore.accessToken ? UserAvatar : UserIcon,
    description: !authStore.accessToken && 'Login',
  },
];
