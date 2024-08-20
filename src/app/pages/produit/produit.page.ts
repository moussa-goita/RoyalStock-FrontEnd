import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonItem,
  IonLabel,
  IonList, IonSearchbar,
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
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardContent, IonList, IonLabel, IonItem, IonSearchbar, IonCardTitle, IonCardHeader, IonCard, IonCardSubtitle]
})
export class ProduitPage implements OnInit {
  produits: Produit[] = [];
  filteredProduits: Produit[] = [];
  searchQuery: string = '';

  produitsToDelete: number | null = null;
  produitsToEdit: number | null = null;
  errorMessage = '';
  infoMessage = '';
  currentUser: CurrentUser | null = null;

  constructor(private produitService: ProduitService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits() {
    this.produitService.getProduits().subscribe(
      (data: Produit[]) => {
        this.produits = data;
        this.filteredProduits = data;
      },
      error => {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredProduits = this.produits.filter(produit =>
      produit.productName.toLowerCase().includes(filterValue)
    );
  }
}
