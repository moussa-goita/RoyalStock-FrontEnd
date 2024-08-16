import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonItem, IonLabel, IonList, IonSearchbar,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { Fournisseur } from '../../models/fournisseur';
import {FournisseurService} from "../../services/fournisseur.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.page.html',
  styleUrls: ['./fournisseurs.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList, IonSearchbar]
})
export class FournisseursPage implements OnInit {

  fournisseurs: Fournisseur[] = [];
  filteredFournisseurs: Fournisseur[] = [];

  fournisseurToDelete: number | null = null;
  fournisseurToEdit: number | null = null;
  infoMessage: string = '';
  errorMessage: string = '';

  constructor(private fournisseurService: FournisseurService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser || !currentUser.email) {
      this.errorMessage = 'Erreur: email utilisateur non trouvé';
      return;
    }
    const email = currentUser.email;

    this.fournisseurService.getFournisseursForCurrentUser(email).subscribe(fournisseurs => {
      if (fournisseurs.length === 0) {
        this.infoMessage = 'Aucune Fournisseurs trouvée pour cet Entrepot.';
        setTimeout(() => this.infoMessage = '', 2000);
      } else {
        this.fournisseurs = fournisseurs;
      }
    }, error => {
      console.error('Erreur lors de la récupération des fournisseurs:', error);
      this.errorMessage = 'Erreur lors de la récupération des fournisseurs.';
    });
  }

  addFournisseur(): void {
    this.router.navigate(['/add-fournisseur']);
  }

  editFournisseur(id: number): void {
    this.router.navigate(['/edit-fournisseur', id]);
  }

  deleteFournisseur(id: number): void {
    this.fournisseurService.deleteFournisseur(id).subscribe(() => {
      this.fournisseurs = this.fournisseurs.filter(f => f.id !== id);
      this.filteredFournisseurs = this.filteredFournisseurs.filter(f => f.id !== id);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredFournisseurs = this.fournisseurs.filter(fournisseur =>
      fournisseur.fournName.toLowerCase().includes(filterValue)
    );
  }
}
