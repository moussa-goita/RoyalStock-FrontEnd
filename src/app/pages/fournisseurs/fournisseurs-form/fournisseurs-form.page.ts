import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Fournisseur } from 'src/app/models/fournisseur';
import { AuthService } from 'src/app/services/auth.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-fournisseurs-form',
  templateUrl: './fournisseurs-form.page.html',
  styleUrls: ['./fournisseurs-form.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class FournisseursFormPage implements OnInit {
  fournisseurForm: FormGroup;
  currentFournisseur: Fournisseur | null = null;
  fournisseur: Fournisseur = {} as Fournisseur;
  isEditMode: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fournisseurService: FournisseurService,
    private authService: AuthService,
  ) {
    this.fournisseurForm = this.fb.group({
      fournName: ['', Validators.required],
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
          fournName: this.fournisseur.fournName,
          adresse: this.fournisseur.adresse,
          telephone: this.fournisseur.telephone,
          service: this.fournisseur.service,
          email: this.fournisseur.email
        });
      },
      (error) => {
        console.error('Erreur lors du chargement du fournisseur:', error);
        this.errorMessage = 'Erreur lors du chargement du fournisseur.';
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  onSubmit(): void {
    if (!this.fournisseurForm.valid) {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
      setTimeout(() => (this.errorMessage = ''), 3000);
      return;
    }

    const formData = this.fournisseurForm.value;
    this.fournisseur = { ...this.fournisseur, ...formData };
    console.log(formData);

    if (this.isEditMode) {
      this.updateFournisseur();
    } else {
      this.createFournisseur();
    }
  }

  createFournisseur(): void {
    const currentUserEmail = this.authService.currentUserValue?.email;
    if (!currentUserEmail) {
      this.errorMessage = 'Erreur : utilisateur non authentifié.';
      setTimeout(() => (this.errorMessage = ''), 3000);
      return;
    }

    this.fournisseurService.createFournisseur(this.fournisseur, currentUserEmail).subscribe(
      () => {
        this.successMessage = 'Fournisseur créé avec succès!';
        setTimeout(() => (this.successMessage = ''), 3000);
        this.router.navigate(['/fournisseurs-list']);
      },
      (error) => {
        console.error('Erreur lors de la création du fournisseur:', error);
        this.errorMessage = 'Erreur lors de la création du fournisseur.';
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  updateFournisseur(): void {
    this.fournisseurService.updateFournisseur(this.fournisseur.id, this.fournisseur).subscribe(
      () => {
        this.successMessage = 'Fournisseur mis à jour avec succès!';
        setTimeout(() => (this.successMessage = ''), 3000);
        this.router.navigate(['/fournisseurs-list']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du fournisseur:', error);
        this.errorMessage = 'Erreur lors de la mise à jour du fournisseur.';
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  deleteFournisseur(): void {
    if (!this.fournisseur.id) return;

    this.fournisseurService.deleteFournisseur(this.fournisseur.id).subscribe(
      () => {
        this.successMessage = 'Fournisseur supprimé avec succès!';
        setTimeout(() => (this.successMessage = ''), 3000);
        this.router.navigate(['/fournisseurs-list']);
      },
      (error) => {
        console.error('Erreur lors de la suppression du fournisseur:', error);
        this.errorMessage = 'Erreur lors de la suppression du fournisseur.';
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  onCancel() {
    this.router.navigate(['/fournisseurs-list']);
  }
}
