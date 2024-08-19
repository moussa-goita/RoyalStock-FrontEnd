import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';

import {
  IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle,
  IonToolbar, IonGrid, IonRow, IonCardContent, IonText, IonIcon,
  IonCol, IonCard, IonCardHeader, IonCardTitle
} from '@ionic/angular/standalone';

import { BonEntreService } from 'src/app/services/bon-entre.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DataChartService } from 'src/app/services/data-chart.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonCardTitle, IonCardHeader, IonCard, IonCol, IonIcon, IonText, 
    IonCardContent, IonRow, IonGrid, IonButtons, IonContent, 
    IonMenuButton, IonHeader, IonTitle, IonToolbar, CommonModule, 
    FormsModule, ChartModule
  ]
})
export class DashboardPage implements OnInit {

  stockTotal = 1000;  // Exemple de valeur, à remplacer par la valeur réelle
  valeurEntrees = 50000;  // Exemple de valeur
  valeurSorties = 30000;  // Exemple de valeur
  totalEntrees = 150;  // Exemple de valeur
  totalSorties = 100;  // Exemple de valeur
  pieDataValues: any;
  pieDataTotals: any;
  pieOptions: any;
  pieOptionsWithLegendBottom: any;

  constructor(
    private dashboardService: DashboardService,
    private datachartService: DataChartService,
    private bonEntreService: BonEntreService) {}

  ngOnInit() {
    this.loadStockInfo();
    this.createPieCharts();
  }

  loadStockInfo(): void {
    this.dashboardService.getStockInfo().subscribe((data: any) => {
      this.stockTotal = data.stockTotal;
      this.totalEntrees = data.totalEntrees;
      this.valeurEntrees = data.valeurEntrees;
      this.totalSorties = data.totalSorties;
      this.valeurSorties = data.valeurSorties;
      this.createPieCharts();  // Create charts after data is loaded
    });
  }

  createPieCharts(): void {
    const documentStyle = getComputedStyle(document.documentElement);

    // Graphique pour les valeurs Entrées et Sorties
    this.pieDataValues = {
      labels: ['Entrée (Valeur)', 'Sortie (Valeur)'],  // Les labels sont bien définis ici
      datasets: [{
        data: [this.valeurEntrees, this.valeurSorties],
        backgroundColor: [
          '#FFB423',   // Couleur personnalisée pour la Valeur Entrées
          'blue'       // Couleur pour la Valeur Sorties
        ],
        hoverBackgroundColor: [
          '#FFB423',  // Couleur de survol pour la Valeur Entrées
          documentStyle.getPropertyValue('--ion-color-primary-shade')  // Teinte pour la Valeur Sorties
        ]
      }]
    };

    // Graphique pour les totaux Entrées et Sorties
    this.pieDataTotals = {
      labels: ['Entrée (Total)', 'Sortie (Total)'],  // Les labels sont bien définis ici
      datasets: [{
        data: [this.totalEntrees, this.totalSorties],
        backgroundColor: [
          'green',  // Couleur pour le Total Entrées
          'grey'    // Couleur pour le Total Sorties
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--ion-color-success-shade'), // Teinte pour le Total Entrées
          documentStyle.getPropertyValue('--ion-color-medium-shade')   // Teinte pour le Total Sorties
        ]
      }]
    };

    this.pieOptions = {
      plugins: {
        legend: {
          labels: {
            color: documentStyle.getPropertyValue('--ion-text-color')
          }
        }
      },
      maintainAspectRatio: false
    };

    // Définition des options avec la légende en bas
    // Définition des options avec la légende en bas
this.pieOptionsWithLegendBottom = {
  plugins: {
    legend: {
      display: true,
      position: 'bottom',  // Position de la légende en bas
      labels: {
        color: documentStyle.getPropertyValue('--ion-text-color'),
        font: {
          size: 12  // Taille de la police réduite pour s'adapter aux petits écrans
        },
        padding: 10  // Ajouter du padding autour des éléments de légende
      }
    }
  },
  layout: {
    padding: {
      bottom: 20, // Espace supplémentaire sous le graphique pour les légendes
    }
  },
  maintainAspectRatio: false,
  responsive: true, // Assurez-vous que le graphique est réactif
};

}
}
