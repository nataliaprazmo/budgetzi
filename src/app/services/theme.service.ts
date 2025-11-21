import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = signal<boolean>(this.loadThemePreference());

  constructor() {
    this.applyTheme(this.isDarkMode());
  }

  toggleDarkMode(): void {
    this.isDarkMode.set(!this.isDarkMode());
    this.saveThemePreference(this.isDarkMode());
    this.applyTheme(this.isDarkMode());
  }

  private applyTheme(isDark: boolean): void {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add('dark-theme');
    } else {
      htmlElement.classList.remove('dark-theme');
    }
  }

  private loadThemePreference(): boolean {
    const saved = localStorage.getItem('theme-preference');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private saveThemePreference(isDark: boolean): void {
    localStorage.setItem('theme-preference', isDark ? 'dark' : 'light');
  }
}
