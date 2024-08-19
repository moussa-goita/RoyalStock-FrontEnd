import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

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
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { Fournisseur } from 'src/app/models/fournisseur';
import { AuthService } from 'src/app/services/auth.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-fournisseurs-form',
  templateUrl: './fournisseurs-form.page.html',
  styleUrls: ['./fournisseurs-form.page.scss'],
  standalone: true,
  imports: [
    IonText, 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonMenuButton,
    RouterModule,
    IonButton,
    IonButtons,
    IonSelectOption,
    IonBackButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonFooter,
    IonLabel,
    IonTitle,
    IonSelect,
    IonToolbar,
    IonRow,
    IonCol,
  ],
})
export class FournisseursFormPage implements OnInit {
  fournisseurForm: FormGroup;
  fournisseur: Fournisseur = {} as Fournisseur;
  isEditMode: boolean = false;
  successMessage: string = '';
  currentFournisseur: Fournisseur | null = null; // Ajout de la propriété `currentFournisseur`

  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fournisseurService: FournisseurService,
    private authService: AuthService
  ) {
    this.fournisseurForm = this.fb.group({
      fourName: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      service: ['', Validators.required],
      email: ['', [Validators.email]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadFournisseurById(+id);
    }
  }

  loadFournisseurById(id: number): void {
    this.fournisseurService.getFournisseurById(id).subscribe(
      (data) => {
        this.fournisseur = data;
        this.fournisseurForm.patchValue({
          fourName: this.fournisseur.four_name,
          adresse: this.fournisseur.adresse,
          telephone: this.fournisseur.telephone,
          service: this.fournisseur.service,
          email: this.fournisseur.email
        });
        console.log('Fournisseur chargé:', data);
      },
      (error) => {
        console.error('Error loading fournisseur:', error);
        this.errorMessage = 'Erreur lors du chargement du fournisseur.';
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  onSubmit(): void {
    console.log('onSubmit appelé');
    
    if (!this.fournisseurForm.valid) {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
      setTimeout(() => (this.errorMessage = ''), 3000);
      return;
    }
  
    const formData = this.fournisseurForm.value;
    this.fournisseur = {
      ...this.fournisseur,
      ...formData,
    };
  
    if (this.isEditMode) {
      this.fournisseurService.updateFournisseur(this.fournisseur.id, this.fournisseur).subscribe(
        () => {
          this.successMessage = 'Fournisseur mis à jour avec succès!';
          setTimeout(() => (this.successMessage = ''), 3000);
          this.router.navigate(['/fournisseurs-list']);
        },
        (error) => {
          console.error('Error updating fournisseur:', error);
          this.errorMessage = 'Erreur lors de la mise à jour du fournisseur.';
          setTimeout(() => (this.errorMessage = ''), 3000);
        }
      );
    } else {
      const currentUserEmail = this.authService.currentUserValue?.email;
      if (!currentUserEmail) {
        this.errorMessage = 'Erreur : utilisateur non authentifié.';
        setTimeout(() => (this.errorMessage = ''), 3000);
        return;
      }
  
      this.fournisseurService.createFournisseur(this.fournisseur, currentUserEmail).subscribe(
        (fournisseur: Fournisseur) => {
          if (fournisseur && fournisseur.id) {
            this.successMessage = 'Fournisseur créé avec succès!';
            
            setTimeout(() => (this.successMessage = ''), 3000);
  
            this.router.navigate(['/fournisseurs-list']);
          } else {
            console.error('Le fournisseur a été créé mais l\'ID est indéfini.');
          }
        },
        (error) => {
          console.error('Error creating fournisseur:', error);
          this.errorMessage = 'Erreur lors de la création du fournisseur.';
          setTimeout(() => (this.errorMessage = ''), 3000);
        }
      );
    }
  }

  deleteFournisseur(): void {
    if (!this.fournisseur.id) return;

    this.fournisseurService.deleteFournisseur(this.fournisseur.id).subscribe(
      () => {
        this.successMessage = 'Fournisseur supprimé avec succès!';
        setTimeout(() => (this.successMessage = ''), 3000);
        this.router.navigate(['/fournisseurs']);
      },
      (error) => {
        console.error('Error deleting fournisseur:', error);
        this.errorMessage = 'Erreur lors de la suppression du fournisseur.';
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  onCancel() {
    this.router.navigate(['/fournisseurs']);
  }
}
