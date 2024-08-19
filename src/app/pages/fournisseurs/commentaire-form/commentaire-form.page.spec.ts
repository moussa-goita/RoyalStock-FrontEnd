import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentaireFormPage } from './commentaire-form.page';

describe('CommentaireFormPage', () => {
  let component: CommentaireFormPage;
  let fixture: ComponentFixture<CommentaireFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentaireFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
