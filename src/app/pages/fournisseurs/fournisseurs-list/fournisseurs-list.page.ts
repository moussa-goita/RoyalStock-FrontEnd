import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { NgFor } from '@angular/common';
import { addIcons } from 'ionicons';

import { briefcase, call, create, home, image, location, person, star, trash } from 'ionicons/icons';
import { Fournisseur, Statut } from 'src/app/models/fournisseur';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import {ModalController} from "@ionic/angular/standalone";

@Component({
  selector: 'app-fournisseurs-list',
  standalone: true,
  imports: [
    IonicModule,
    NgFor,
  ],
  templateUrl: './fournisseurs-list.page.html',
  styleUrls: ['./fournisseurs-list.page.scss']
})
export class FournisseursListPage implements OnInit {

  fournisseurs: Fournisseur[] = [];
  isModalOpen = false;

  imageUrl: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController,
    private fournisseurService: FournisseurService
  ) {
    addIcons({ star, location, home, person, call, trash, briefcase, image, create });
  }

  ngOnInit() {
    this.loadFournisseurs();
  }

  loadFournisseurs() {
    this.fournisseurService.getFournisseurs().subscribe({
      next: (data) => {
        this.fournisseurs = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des fournisseurs:', error);
      }
    });
  }

  async confirmToggle(fournisseur: Fournisseur) {
    const action = fournisseur.statut === Statut.PUBLIC ? 'privé' : 'public';
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: `Voulez-vous vraiment rendre ce fournisseur ${action} ?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Oui',
          handler: () => this.toggleFournisseurStatut(fournisseur)
        }
      ]
    });

    await alert.present();
  }

  toggleFournisseurStatut(fournisseur: Fournisseur) {
    const newStatut = fournisseur.statut === Statut.PUBLIC ? Statut.PRIVE : Statut.PUBLIC;

    this.fournisseurService.mettreFournisseurPublic(fournisseur.id, newStatut).subscribe({
      next: () => {
        fournisseur.statut = newStatut;
        this.loadFournisseurs();  // Recharge la liste après la modification
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du statut du fournisseur', error);
      }
    });
  }


  openImageModal(fournisseur: any) {
    this.isModalOpen = true;
    this.imageUrl = fournisseur.imageUrl; // Si l'image est déjà stockée
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  closeModal() {
    this.isModalOpen = false;
  }

  goToAddForm() {
    this.router.navigate(['/fournisseurs-form']);
  }

  goToCommentForm(fournisseurId: number): void {
    this.router.navigate([`/commentaire-form/${fournisseurId}`]);
  }

  editFournisseur(fournisseurId: number) {
    this.router.navigate([`/fournisseurs-form/${fournisseurId}`]);
  }

  deleteFournisseur(fournisseur: Fournisseur) {
    this.fournisseurService.deleteFournisseur(fournisseur.id).subscribe({
      next: () => {
        this.fournisseurs = this.fournisseurs.filter(f => f.id !== fournisseur.id);
        this.loadFournisseurs();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du fournisseur:', error);
      }
    });
  }

  uploadImage(fournisseur: any) {
    if (this.selectedFile) {
      this.fournisseurService.uploadContrat(fournisseur.id, this.selectedFile).subscribe(response => {
        console.log('Image uploadée avec succès:', response);
        this.closeModal(); // Fermer le modal après le succès de l'upload
      });
    }
  }


  getContrat(fournisseurId: number) {
    this.fournisseurService.getContrat(fournisseurId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  deleteContrat(fournisseurId: number) {
    this.fournisseurService.deleteContrat(fournisseurId).subscribe(response => {
      console.log('Contrat supprimé:', response);
    });
  }

}
