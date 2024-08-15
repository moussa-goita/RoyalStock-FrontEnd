import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon, IonInput, IonItem, IonRow, IonSelect, IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCol, IonFooter, IonIcon, IonInput, IonItem, IonRow, IonSelect, IonSelectOption, ReactiveFormsModule]
})
export class DetailPage implements OnInit {
  detailForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.detailForm = this.fb.group({
      produit: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]],
      prix: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.detailForm.valid) {
      const detailData = this.detailForm.value;
      console.log('Détail soumis :', detailData);

      // this.router.navigate(['/some-page']);
    } else {
      console.log('Formulaire invalide');
    }
  }

  onCancel() {
    this.router.navigate(['/bon-sortie-list']);
  }
}
