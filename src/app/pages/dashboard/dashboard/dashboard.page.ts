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

    this.pieDataValues = {
      labels: ['Valeur Entrées', 'Valeur Sorties'],
      datasets: [{
        data: [this.valeurEntrees, this.valeurSorties],
        backgroundColor: [
          documentStyle.getPropertyValue('--ion-color-primary'),
          documentStyle.getPropertyValue('--ion-color-danger')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--ion-color-primary-shade'),
          documentStyle.getPropertyValue('--ion-color-danger-shade')
        ]
      }]
    };

    this.pieDataTotals = {
      labels: ['Total Entrées', 'Total Sorties'],
      datasets: [{
        data: [this.totalEntrees, this.totalSorties],
        backgroundColor: [
          documentStyle.getPropertyValue('--ion-color-secondary'),
          documentStyle.getPropertyValue('--ion-color-warning')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--ion-color-secondary-shade'),
          documentStyle.getPropertyValue('--ion-color-warning-shade')
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
    this.pieOptionsWithLegendBottom = {
      plugins: {
        legend: {
          display: true,
          position: 'bottom',  // Position de la légende en bas
          labels: {
            color: documentStyle.getPropertyValue('--ion-text-color')
          }
        }
      },
      maintainAspectRatio: false
    };
  }
  
}
