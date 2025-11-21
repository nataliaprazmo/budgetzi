import { Injectable, computed } from '@angular/core';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root',
})
export class ChartColorsService {
  axisColor = computed(() => (this.themeService.isDarkMode() ? '#e0e0e0' : '#333333'));

  legendColor = computed(() => (this.themeService.isDarkMode() ? '#e0e0e0' : '#333333'));

  gridColor = computed(() =>
    this.themeService.isDarkMode() ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
  );

  borderColor = computed(() => (this.themeService.isDarkMode() ? 'rgb(30, 37, 53)' : '#ffffff'));

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkMode.set(this.themeService.isDarkMode());
    this.setupThemeListener();
  }

  private setupThemeListener(): void {
    const observer = new MutationObserver(() => {
      this.themeService.isDarkMode.set(document.documentElement.classList.contains('dark-theme'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }
}
