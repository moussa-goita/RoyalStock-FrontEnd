import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  IonModal,
  IonRouterLink,
  IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { BonEntree } from 'src/app/models/bon-entree';
import { AuthService } from 'src/app/services/auth.service';
import { BonEntreService } from 'src/app/services/bon-entre.service';

@Component({
  selector: 'app-bon-entre-list',
  templateUrl: './bon-entre-list.page.html',
  styleUrls: ['./bon-entre-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    IonButton,
    IonIcon,
    IonInput,
    IonItem,
    IonList,
    IonModal,
    IonSearchbar
  ],
})
export class BonEntreListPage implements OnInit {
  bonEntrees: BonEntree[] = [];
  filteredBonEntrees: BonEntree[] = [];
  bonEntreeToDelete: number | null = null;
  selectedBonEntree: BonEntree | null = null;
  infoMessage = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private bonEntreService: BonEntreService
  ) {
    // Ajouter des icônes personnalisées pour les boutons et les actions
    addIcons({ calendar, print, document, clipboard, person, create, add, eye, trash });
  }

  ngOnInit(): void {
    // Chargement initial des Bons d'Entrée à partir du service
    this.loadBonEntrees();
  }

  loadBonEntrees(): void {
    // Récupère l'utilisateur actuellement connecté
    const currentUser = this.authService.currentUserValue;
    
    // Si l'utilisateur est associé à un entrepôt, charge les Bons d'Entrée de cet entrepôt
    if (currentUser && currentUser.entrepot) {
      const entrepotId = currentUser.entrepot.entrepotId;
      this.bonEntreService.getBonEntreesByEntrepots(entrepotId).subscribe(data => {
        console.log('Données reçues:', data); // Debugging
        if (data.length === 0) {
          this.infoMessage = 'Aucun Bon d\'Entrée trouvé pour cet Entrepôt.';
          setTimeout(() => this.infoMessage = '', 2000);
        } else {
          this.bonEntrees = data;
          this.filteredBonEntrees = data;
        }
      }, error => {
        console.error('Erreur lors de la récupération des Bons d\'Entrée:', error);
        this.errorMessage = 'Erreur lors de la récupération des Bons d\'Entrée.';
      });
    } else {
      this.errorMessage = 'Erreur: entrepôt utilisateur non trouvé';
    }
  }

  applyFilter(event: Event): void {
    // Filtrer les Bons d'Entrée selon le statut entré par l'utilisateur
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredBonEntrees = this.bonEntrees.filter(bonEntree =>
      bonEntree.statut.toLowerCase().includes(filterValue)
    );
  }

  deleteBonEntree(id: number): void {
    // Demande de confirmation avant la suppression
    if (confirm('Êtes-vous sûr de vouloir supprimer ce Bon d\'Entrée ?')) {
      // Suppression du Bon d'Entrée s'il est confirmé
      this.bonEntreService.deleteBonEntree(id).subscribe(() => {
        // Mise à jour de la liste des Bons d'Entrée après la suppression
        this.bonEntrees = this.bonEntrees.filter(b => b.id !== id);
        this.filteredBonEntrees = this.filteredBonEntrees.filter(b => b.id !== id);
      });
    }
  }

  printBonEntree(id: number): void {
    // Navigation vers la page d'impression du Bon d'Entrée
    this.router.navigate(['/print-bon-entre', id]);
  }

  goToAddForm() {
    // Navigation vers le formulaire d'ajout de Bon d'Entrée
    console.log('Navigation vers le formulaire');
    this.router.navigate(['/bon-entre-form']);
    console.log('Navigation vers le formulaire terminée');
  }

  goToAddDetail(bonEntreeId: number): void {
    // Navigation vers la page des détails du Bon d'Entrée
    this.router.navigate(['/bon-entre-detail', bonEntreeId]);
  }

  hasRole(role: string): boolean {
    // Vérifie si l'utilisateur a le rôle requis
    return this.authService.hasRole(role);
  }
}
