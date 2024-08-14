import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntrepotsPage } from './entrepots.page';

describe('EntrepotsPage', () => {
  let component: EntrepotsPage;
  let fixture: ComponentFixture<EntrepotsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepotsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
