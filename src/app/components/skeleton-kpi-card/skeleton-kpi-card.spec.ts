import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonKpiCard } from './skeleton-kpi-card';

describe('SkeletonKpiCard', () => {
  let component: SkeletonKpiCard;
  let fixture: ComponentFixture<SkeletonKpiCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonKpiCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonKpiCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
