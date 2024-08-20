import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FournisseursPage } from './fournisseurs.page';

describe('FournisseursPage', () => {
  let component: FournisseursPage;
  let fixture: ComponentFixture<FournisseursPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisseursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
