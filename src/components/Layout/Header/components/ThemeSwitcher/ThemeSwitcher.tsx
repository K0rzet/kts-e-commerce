import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/store/RootStoreContext';
import ThemeIcon from '@/components/icons/ThemeIcon';

const ThemeSwitcher: React.FC<{ className?: string }> = observer(({ className }) => {
  const { themeStore } = useRootStore();
  const handleToggleTheme = () => {
    themeStore.toggleTheme();
  };
  return <ThemeIcon onClick={handleToggleTheme} isLight={themeStore.theme === 'light'} className={className} />;
});

export default ThemeSwitcher;
