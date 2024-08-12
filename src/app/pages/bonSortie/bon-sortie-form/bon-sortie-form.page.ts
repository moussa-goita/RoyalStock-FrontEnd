import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-bon-sortie-form',
  templateUrl: './bon-sortie-form.page.html',
  styleUrls: ['./bon-sortie-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // IonicModule,
    IonMenuButton,
    RouterModule,
    IonButton,
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonFooter,
    IonLabel,
    IonTitle,
    IonToolbar,
    IonRow,
    IonCol,
  ],
})
export class BonSortieFormPage {
  bonSortieForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.bonSortieForm = this.fb.group({
      numero: ['', Validators.required],
      date: ['', Validators.required],
      motif: ['', Validators.required],
      utilisateur: ['', Validators.required],
    });
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
