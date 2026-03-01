import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  keywords?: string;
  author?: string;
  robots?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  private defaultConfig: SeoConfig = {
    title: 'Budget Tracker',
    description: 'Track and manage your financial transactions with ease',
    keywords: 'budget, tracker, finance, transactions, expense management',
    author: 'Budget Tracker',
    robots: 'index, follow',
  };

  constructor() {
    this.setDefaultMeta();
  }

  private setDefaultMeta(): void {
    // default meta tags
    this.metaService.updateTag({ name: 'author', content: this.defaultConfig.author! });
    this.metaService.updateTag({ name: 'robots', content: this.defaultConfig.robots! });
    this.metaService.updateTag({ httpEquiv: 'content-type', content: 'text/html; charset=utf-8' });
    this.metaService.updateTag({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    });
    this.metaService.updateTag({ name: 'theme-color', content: '#1976d2' });
  }

  updateMeta(config: SeoConfig): void {
    const finalConfig = { ...this.defaultConfig, ...config };

    // page title
    if (finalConfig.title) {
      this.titleService.setTitle(finalConfig.title);
      this.metaService.updateTag({
        property: 'og:title',
        content: finalConfig.ogTitle || finalConfig.title,
      });
    }

    // meta description
    if (finalConfig.description) {
      this.metaService.updateTag({ name: 'description', content: finalConfig.description });
      this.metaService.updateTag({
        property: 'og:description',
        content: finalConfig.ogDescription || finalConfig.description,
      });
    }

    // keywords
    if (finalConfig.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: finalConfig.keywords });
    }

    // open graph tags
    if (finalConfig.ogImage) {
      this.metaService.updateTag({ property: 'og:image', content: finalConfig.ogImage });
    }

    if (finalConfig.ogUrl) {
      this.metaService.updateTag({ property: 'og:url', content: finalConfig.ogUrl });
      this.metaService.updateTag({ property: 'og:type', content: 'website' });
    }

    // canonical link
    if (finalConfig.canonical) {
      this.removeCanonicalLink();
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', finalConfig.canonical);
      document.head.appendChild(link);
    }
  }

  setPageMeta(
    title: string,
    description: string,
    config?: Omit<SeoConfig, 'title' | 'description'>,
  ): void {
    this.updateMeta({
      title,
      description,
      ...config,
    });
  }

  private removeCanonicalLink(): void {
    const canonical = document.querySelector("link[rel='canonical']");
    if (canonical) {
      canonical.remove();
    }
  }

  resetToDefault(): void {
    this.updateMeta(this.defaultConfig);
  }
}
