import { makeAutoObservable } from 'mobx';

export class ThemeStore {
  theme: 'light' | 'dark' = 'light';

  constructor() {
    makeAutoObservable(this);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      this.theme = savedTheme;
    } else {
      this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  toggleTheme() {
    this.setTheme(this.theme === 'light' ? 'dark' : 'light');
  }
}
