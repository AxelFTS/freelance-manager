import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureDetailPage } from './facture-detail-page';

describe('FactureDetailPage', () => {
  let component: FactureDetailPage;
  let fixture: ComponentFixture<FactureDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactureDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
