import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput, IonItem, IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCol, IonFooter, IonInput, IonItem, IonRow, ReactiveFormsModule]
})
export class FormPage implements OnInit {
  bonSortieForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.bonSortieForm = this.fb.group({
      numero: ['', Validators.required],
      date: ['', Validators.required],
      motif: ['', Validators.required],
      utilisateur: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.bonSortieForm.valid) {
      const bonSortieData = this.bonSortieForm.value;
      console.log('Bon de Sortie soumis :', bonSortieData);


      this.router.navigate(['/bon-sortie-detail']);
    }
    else {
      console.log('Formulaire invalide');
    }

  }
  onCancel() {
    this.router.navigate(['/bon-sortie-list']);

    // this.bonSortieForm.reset();
  }
}
