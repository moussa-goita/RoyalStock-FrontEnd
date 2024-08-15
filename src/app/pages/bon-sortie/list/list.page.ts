import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard, IonCardContent,
  IonCardHeader,
  IonCardTitle, IonCol,
  IonContent, IonGrid,
  IonHeader, IonIcon, IonItem, IonLabel, IonList, IonRow, IonSearchbar, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {BonSortie} from "../../../models/bon-sortie";
import {AuthService} from "../../../services/auth.service";
import {BonSortieService} from "../../../services/bon-sortie.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonSearchbar, IonCardContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonCol, IonGrid, IonRow, IonText]
})
export class ListPage implements OnInit {

  bonSorties: BonSortie[] = [];
  filteredBonSorties: BonSortie[] = [];
  bonSortieToDelete: number | null = null;
  selectedBonSortie: BonSortie | null = null;

  infoMessage= '';
  errorMessage= '';

  constructor(
    private bonSortieService: BonSortieService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadBonSorties();
  }

  goToAddForm() {
    console.log('Navigation vers le formulaire');

    this.router.navigate(['/bon-sortie-form']);
    console.log('Navigation vers le Ok');
  }
  goToAddDetail(){
    this.router.navigate(['/bon-sortie-detail']);
  }

  loadBonSorties(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.entrepot) {
      const entrepotId = currentUser.entrepot.entrepotId;
      this.bonSortieService.getBonSortiesByEntrepots(entrepotId).subscribe(data => {
        console.log('Données reçues:', data); // Debugging
        if (data.length === 0) {
          this.infoMessage = 'Aucun Bon Entrees trouvée pour cet Entrepot.';
          setTimeout(() => this.infoMessage = '', 2000);
        } else {
          this.bonSorties = data;
          this.filteredBonSorties = data;
        }
      }, error => {
        console.error('Erreur lors de la récupération des Bon Entrees:', error);
        this.errorMessage = 'Erreur lors de la récupération des Bon Entrees.';
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

  deleteBonSortie(id: number): void {
    this.bonSortieService.deleteBonSortie(id).subscribe(() => {
      this.bonSorties = this.bonSorties.filter(b => b.id !== id);
      this.filteredBonSorties = this.filteredBonSorties.filter(b => b.id !== id);
    });
  }

  printBonSortie(id: number): void {
    this.router.navigate(['/print-bon-sortie', id]);
  }

  navigateToAddDetail(bonSortieId: number): void {
    this.router.navigate(['/bon-sortie-detail', bonSortieId]);
  }

  hasDetails(bonSortie: BonSortie): boolean {
    return bonSortie.detailsSorties && bonSortie.detailsSorties.length > 0;
  }
  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }
}
