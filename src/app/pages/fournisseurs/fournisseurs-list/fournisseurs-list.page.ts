import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonModal, IonRouterLink, IonText, IonTextarea, IonTitle, IonToggle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

import { briefcase, call, create, home, image, location, person, star, trash } from 'ionicons/icons';
import { Fournisseur, Statut } from 'src/app/models/fournisseur';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-fournisseurs-list',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonMenuButton,
    IonTitle,
    IonButtons,
    IonContent,
    IonCard,
    IonCardContent,
    IonText,
    IonIcon,
    IonInput,
    NgFor,
    IonItem,
    IonLabel,
    IonTextarea,
    IonButton,
    IonToggle,
    IonModal,
    IonRouterLink
  ],
  templateUrl: './fournisseurs-list.page.html',
  styleUrls: ['./fournisseurs-list.page.scss']
})
export class FournisseursListPage implements OnInit {

  fournisseurs: Fournisseur[] = [];
  isModalOpen = false;
  imageUrl = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
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
          role: 'cancel',
          handler: () => {
            console.log('Confirmation annulée');
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.toggleFournisseurStatut(fournisseur);
          }
        }
      ]
    });

    await alert.present();
  }

  toggleFournisseurStatut(fournisseur: Fournisseur) {
    const newStatut = fournisseur.statut === Statut.PUBLIC ? Statut.PRIVE : Statut.PUBLIC;
    this.fournisseurService.mettreFournisseurPublic(fournisseur.id).subscribe(
      (response: Fournisseur) => {
        fournisseur.statut = newStatut;
        console.log(`Le fournisseur ${fournisseur.four_name} est maintenant ${newStatut}`);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du statut du fournisseur', error);
      }
    );
  }

  openImageModal(fournisseur: Fournisseur) {
    this.imageUrl = '../../../../assets/WhatsApp Image 2024-02-24 at 1.14.06 AM.jpeg';
    this.isModalOpen = true;
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

  editFournisseur(fournisseur: Fournisseur) {
    console.log('Modifier le fournisseur:', fournisseur.four_name);
  }

  deleteFournisseur(fournisseur: Fournisseur) {
    this.fournisseurService.deleteFournisseur(fournisseur.id).subscribe({
      next: () => {
        this.fournisseurs = this.fournisseurs.filter(f => f.id !== fournisseur.id);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du fournisseur:', error);
      }
    });
  }
}
