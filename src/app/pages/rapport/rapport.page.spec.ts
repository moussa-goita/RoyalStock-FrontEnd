import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RapportPage } from './rapport.page';

describe('RapportPage', () => {
  let component: RapportPage;
  let fixture: ComponentFixture<RapportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
