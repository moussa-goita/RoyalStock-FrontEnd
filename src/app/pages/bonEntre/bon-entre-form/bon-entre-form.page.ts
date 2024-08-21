import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonRow, IonSelect, IonSelectOption, IonToolbar, IonTitle } from '@ionic/angular/standalone';

import { FournisseurService } from 'src/app/services/fournisseur.service';
import { Fournisseur } from 'src/app/models/fournisseur';
import { AuthService } from 'src/app/services/auth.service';
import { BonEntreService } from 'src/app/services/bon-entre.service';

@Component({
  selector: 'app-bon-entre-form',
  templateUrl: './bon-entre-form.page.html',
  styleUrls: ['./bon-entre-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonTitle,
    IonToolbar,
    IonMenuButton,
    IonButton,
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonFooter,
    IonLabel,
    IonRow,
    IonCol,
    IonSelect,
    IonSelectOption
  ],
})
export class BonEntreFormPage implements OnInit {
  bonEntreeForm: FormGroup;
  fournisseurs: Fournisseur[] = [];
  generatedNumero: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bonEntreService: BonEntreService,
    private fournisseurService: FournisseurService,
    private authService: AuthService
  ) {
    this.bonEntreeForm = this.fb.group({
      numero: [{ value: '', disabled: true }], // Numéro généré automatiquement
      dateCommande: ['', Validators.required],
      fournisseur: ['', Validators.required],
      // utilisateur: ['', Validators.required],  // Uncomment if you need this field
    });
  }

  ngOnInit(): void {
    this.generateNumero();
    this.loadFournisseurs();
    // this.setAuthenticatedUser(); // Uncomment if you need to set the user field
  }

  generateNumero(): void {
    this.generatedNumero = 'BON-' + Math.floor(Math.random() * 10000); // Exemple simple
    this.bonEntreeForm.patchValue({ numero: this.generatedNumero });
  }

  loadFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe(
      data => this.fournisseurs = data,
      error => console.error('Erreur lors de la récupération des fournisseurs', error)
    );
  }

  onSubmit(): void {
    if (this.bonEntreeForm.valid) {
      const bonEntreeData = this.bonEntreeForm.getRawValue();
      console.log('Bon d\'Entrée soumis :', bonEntreeData);
  
      // Pass the authenticated user's email separately
      this.bonEntreService.createBonEntree(bonEntreeData, this.authService.currentUserValue.email).subscribe(
        response => {
          console.log('Bon d\'Entrée créé avec succès :', response);
         
          const bonEntreeId = response.id;
          this.router.navigate(['/bon-entre-detail', bonEntreeId]);
        },
        error => {
          console.error('Erreur lors de la création du Bon d\'Entrée :', error);
          if (error.error) {
            console.error('Détails de l\'erreur du serveur :', error.error);
          }
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }
   
  goToAddDetail(bonEntreeId: number): void {
    this.router.navigate(['/bon-entre-detail', bonEntreeId]); // Corrected route
  }

  onCancel(): void {
    this.router.navigate(['/bon-entre-list']);
  }
}
