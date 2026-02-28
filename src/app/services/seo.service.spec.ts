import { TestBed } from '@angular/core/testing';

import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update page title and meta description', () => {
    service.setPageMeta('Test Title', 'Test Description');
    expect(document.title).toBe('Test Title');
    const description = document.querySelector("meta[name='description']");
    expect(description?.getAttribute('content')).toBe('Test Description');
  });

  it('should update Open Graph tags', () => {
    service.updateMeta({
      ogTitle: 'OG Title',
      ogDescription: 'OG Description',
      ogImage: 'https://example.com/image.jpg',
      ogUrl: 'https://example.com',
    });
    expect(document.querySelector("meta[property='og:title']")?.getAttribute('content')).toBe('OG Title');
    expect(document.querySelector("meta[property='og:description']")?.getAttribute('content')).toBe(
      'OG Description'
    );
  });

  it('should add canonical link', () => {
    service.updateMeta({ canonical: 'https://example.com/page' });
    const canonical = document.querySelector("link[rel='canonical']");
    expect(canonical?.getAttribute('href')).toBe('https://example.com/page');
  });
});
