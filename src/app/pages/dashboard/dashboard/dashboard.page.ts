import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButtons, IonContent, IonCardSubtitle, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonInput, IonAvatar, IonImg, IonIcon, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { BonEntree } from 'src/app/models/bon-entree';
import { BonSortie } from 'src/app/models/bon-sortie';
import { Produit } from 'src/app/models/produit';
import { ChartModule } from 'primeng/chart'; // Importez le module Chart de PrimeNG

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonGrid, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonIcon, IonImg, IonAvatar, IonButtons, IonContent, IonMenuButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonCol, IonRow, ChartModule
  ]
})
export class DashboardPage implements OnInit {

  totalProduits: number = 0;
  totalQuantiteEntree: number = 0;
  totalQuantiteSortie: number = 0;
  valeurTotaleEntree: number = 0;
  valeurTotaleSortie: number = 0;

  produits: Produit[] = [];
  bonsEntree: BonEntree[] = [];
  bonsSortie: BonSortie[] = [];

  public pieChartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Quantité Totale des Entrées et Sorties',
        color: 'green',
      }
    }
  };

  public pieChartLabels: string[] = ['Quantité Entrées', 'Quantité Sorties'];
  public pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [{
      data: [this.totalQuantiteEntree, this.totalQuantiteSortie],
      backgroundColor: ['#36A2EB', '#FF6384'],
      borderColor: ['#36A2EB', '#FF6384'],
      borderWidth: 1
    }]
  };

  public pieChartOptionsValue: any = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Valeur Totale des Entrées et Sorties (F CFA)',
        color: 'black',
      }
    }
  };

  public pieChartLabelsValue: string[] = ['Valeur Entrées', 'Valeur Sorties'];
  public pieChartDataValue: ChartData<'pie'> = {
    labels: this.pieChartLabelsValue,
    datasets: [{
      data: [this.valeurTotaleEntree, this.valeurTotaleSortie],
      backgroundColor: ['#4BC0C0', '#FFCE56'],
      borderColor: ['#4BC0C0', '#FFCE56'],
      borderWidth: 1
    }]
  };

  ngOnInit() {
    this.produits = [
      { id: 1, productName: 'Produit A', description: 'Description A', quantity: 100, createBy: 1, totalStock: 10, categorie: { id: 1, name: 'Categorie 1', createBy: 1 } },
      { id: 2, productName: 'Produit B', description: 'Description B', quantity: 200, createBy: 1, totalStock: 10, categorie: { id: 2, name: 'Categorie 2', createBy: 1 } },
    ];

    const bonEntree1: BonEntree = {
      id: 1,
      dateCommande: new Date(),
      statut: 'Reçu',
      utilisateur: { id: 1, username: 'Utilisateur 1', contact: 'sybadraaliou@gmail.com', email: '', password: '' },
      fournisseur: { id: 1, fournName: 'Fournisseur 1', adresse: '', telephone: '', createBy: 1 },
      detailEntrees: []
    };

    bonEntree1.detailEntrees = [
      { id: 1, quantite: 50, prix: 100, produit: this.produits[0], bonEntree: bonEntree1 },
      { id: 2, quantite: 30, prix: 200, produit: this.produits[1], bonEntree: bonEntree1 },
    ];

    this.bonsEntree = [bonEntree1];

    const bonSortie1: BonSortie = {
      id: 1,
      dateSortie: new Date(),
      motif: { id: 1, title: 'Vente', createBy: 1 },
      utilisateur: { id: 1, username: 'Utilisateur 1', contact: '', email: '', password: '' },
      detailsSorties: []
    };

    bonSortie1.detailsSorties = [
      { id: 1, quantity: 20, prix: 150, produit: this.produits[0], bonSortie: bonSortie1 },
      { id: 2, quantity: 10, prix: 250, produit: this.produits[1], bonSortie: bonSortie1 },
    ];

    this.bonsSortie = [bonSortie1];

    this.calculateTotals();
  }

  calculateTotals() {
    this.totalProduits = this.produits.reduce((sum, produit) => sum + produit.quantity, 0);

    this.bonsEntree.forEach(bon => {
      bon.detailEntrees.forEach(detail => {
        this.totalQuantiteEntree += detail.quantite;
        this.valeurTotaleEntree += detail.quantite * detail.prix;
      });
    });

    this.bonsSortie.forEach(bon => {
      bon.detailsSorties.forEach(detail => {
        this.totalQuantiteSortie += detail.quantity;
        this.valeurTotaleSortie += detail.quantity * detail.prix;
      });
    });
  }

}
