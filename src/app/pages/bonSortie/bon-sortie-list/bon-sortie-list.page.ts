import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { add, calendar, clipboard, create, document, eye, person, print, trash } from 'ionicons/icons';

import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonMenuButton,
  IonModal, IonRouterLink, IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
  AlertController // Import du service AlertController
} from '@ionic/angular/standalone';
import { BonSortie } from 'src/app/models/bon-sortie';
import { AuthService } from 'src/app/services/auth.service';
import { BonSortieService } from 'src/app/services/bon-sortie.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bon-sortie-list',
  templateUrl: './bon-sortie-list.page.html',
  styleUrls: ['./bon-sortie-list.page.scss'],
  standalone: true,
  imports: [
    IonRouterLink,  
    IonGrid,
    IonCard,
    IonText,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCardSubtitle,
    IonRow,
    IonCol,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonMenuButton,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonIcon,
    IonInput,
    IonItem,
    IonList,
    IonModal,
    IonSearchbar,
  ],
})
export class BonSortieListPage implements OnInit  {
  bonSorties: BonSortie[] = [];
  filteredBonSorties: BonSortie[] = [];
  bonSortieToDelete: number | null = null;
  selectedBonSortie: BonSortie | null = null;
  infoMessage= '';
  errorMessage= '';

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private BonSortieService: BonSortieService,
    private alertController: AlertController // Injection du service AlertController
  ) {
    addIcons({
      calendar, print, document, clipboard, person, create, add, eye, trash
    });
  }

  ngOnInit(): void {
    this.loadBonSorties();
  }

  loadBonSorties(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.entrepot) {
      const entrepotId = currentUser.entrepot.entrepotId;
      this.BonSortieService.getBonSortiesByEntrepots(entrepotId).subscribe(data => {
        if (data.length === 0) {
          this.infoMessage = 'Aucun Bon Sorties trouvée pour cet Entrepot.';
          setTimeout(() => this.infoMessage = '', 2000);
        } else {
          this.bonSorties = data;
          this.filteredBonSorties = data;
        }
      }, error => {
        this.errorMessage = 'Erreur lors de la récupération des Bon Sorties.';
      });
    } else {
      this.errorMessage = 'Erreur: entrepôt utilisateur non trouvé';
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredBonSorties = this.bonSorties.filter(bonSortie =>
      bonSortie.motif && bonSortie.motif.title && bonSortie.motif.title.toLowerCase().includes(filterValue)
    );
  }

  async deleteBonSortie(id: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmation de suppression',
      message: 'Êtes-vous sûr de vouloir supprimer ce bon de sortie?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Supprimer',
          handler: () => {
            this.BonSortieService.deleteBonSortie(id).subscribe(() => {
              this.bonSorties = this.bonSorties.filter(b => b.id !== id);
              this.filteredBonSorties = this.filteredBonSorties.filter(b => b.id !== id);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  printBonSortie(id: number): void {
    this.router.navigate(['/print-bon-sortie', id]);
  }

  goToAddForm() {
    this.router.navigate(['/bon-sortie-form']);
  }

  goToAddDetail(bonSortieId: number): void {
    this.router.navigate(['/bon-sortie-detail', bonSortieId]);
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }
}
