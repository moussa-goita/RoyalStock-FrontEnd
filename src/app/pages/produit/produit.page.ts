import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButtons,
  IonCard,
  IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonItem,
  IonLabel,
  IonList, IonMenuButton, IonSearchbar,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {ProduitService} from "../../services/produit.service";
import {AuthService} from "../../services/auth.service";
import {Produit} from "../../models/produit";
import {Router} from "@angular/router";
import {CurrentUser} from "../../models/currentUser";

@Component({
  selector: 'app-produit',
  templateUrl: './produit.page.html',
  styleUrls: ['./produit.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardContent, IonList, IonLabel, IonItem, IonSearchbar, IonCardTitle, IonCardHeader, IonCard, IonCardSubtitle, IonButtons, IonMenuButton]
})
export class ProduitPage implements OnInit {
  produits: Produit[] = [];
  filteredProduits: Produit[] = [];
  searchQuery: string = '';
  errorMessage = '';

  constructor(private produitService: ProduitService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.entrepot) {
      const entrepotId = currentUser.entrepot.entrepotId;
      this.produitService.getProduitsByEntrepot(entrepotId).subscribe(
        (data: Produit[]) => {
          this.produits = data;
          this.filteredProduits = data;
        },
        error => {
          console.error('Erreur lors de la récupération des produits:', error);
        }
      );
    } else {
      this.errorMessage = 'Erreur: entrepôt utilisateur non trouvé';
    }


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredProduits = this.produits.filter(produit =>
      produit.productName.toLowerCase().includes(filterValue)
    );
  }
}
