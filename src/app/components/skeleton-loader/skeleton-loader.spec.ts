import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonLoader } from './skeleton-loader';

describe('SkeletonLoader', () => {
  let component: SkeletonLoader;
  let fixture: ComponentFixture<SkeletonLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render skeleton loaders based on count', () => {
    component.count = 3;
    fixture.detectChanges();
    const skeletons = fixture.nativeElement.querySelectorAll('.skeleton-loader');
    expect(skeletons.length).toBe(3);
  });
});
