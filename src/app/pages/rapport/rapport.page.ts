import { Component, OnInit } from '@angular/core';
import { DetailEntree } from "../../models/detail-entree";
import { DetailSortie } from "../../models/detail-sortie";
import { RapportService } from 'src/app/services/rapport.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
  IonContent, IonDatetime,
  IonGrid,
  IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal,
  IonRouterLink, IonRow, IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { BonEntree } from 'src/app/models/bon-entree';
import { BonSortie } from 'src/app/models/bon-sortie';


@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.page.html',
  styleUrls: ['./rapport.page.scss'],
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
    IonLabel,
    IonList,
    IonModal,
    IonSearchbar,
    IonDatetime,
  ],
})

export class RapportPage implements OnInit {
  startDate: string ='';
  endDate: string ='';

  formattedStartDate: string | null = null;
  formattedEndDate: string | null = null;

  showStartDatePicker = false;
  showEndDatePicker = false;

  public detailEntrees: DetailEntree[] = [];
  public detailSorties: DetailSortie[] = [];

  public lastThreeDetailsEntree: DetailEntree[] = [];
  public lastThreeDetailsSortie: DetailSortie[] = [];
 
  

  constructor(private rapportService: RapportService, ) {}

  getLastThreeItems(items: any[]): any[] {
    return items
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }
  ngOnInit() {
    this.loadLastThreeDetails();
  }

 
    loadLastThreeDetails() {
      this.rapportService.getAllDetailsEntree().subscribe(detailsEntree => {
        this.lastThreeDetailsEntree = this.getLastThreeItems(detailsEntree);
      });
  
      this.rapportService.getAllDetailsSortie().subscribe(detailsSortie => {
        this.lastThreeDetailsSortie = this.getLastThreeItems(detailsSortie);
      });
    
  
     
      
  }
  onDateChange(event: any, dateType: string) {
    const selectedDate = event.detail.value;
    if (dateType === 'startDate') {
      this.startDate = selectedDate;
      this.formattedStartDate = this.formatDateToDisplay(selectedDate);
      this.showStartDatePicker = false;
    } else if (dateType === 'endDate') {
      this.endDate = selectedDate;
      this.formattedEndDate = this.formatDateToDisplay(selectedDate);
      this.showEndDatePicker = false;
    }
  }

  formatDateToDisplay(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('fr-FR');
  }

 onSubmit() {
  if (this.startDate && this.endDate) {
    if (new Date(this.endDate) >= new Date(this.startDate)) {
      this.loadDetails();
    } else {
      alert('La date de fin ne peut pas être antérieure à la date de début.');
    }
  } else {
    alert('Veuillez sélectionner les deux dates.');
  }
}
  
  loadDetails() {
    // Récupération des détails d'entrée
    this.rapportService.getDetailEntree().subscribe(detailsEntree => {
      this.detailEntrees = detailsEntree;
      // Récupération des détails de sortie une fois les détails d'entrée chargés
      this.rapportService.getDetailSortie().subscribe(detailsSortie => {
        this.detailSorties = detailsSortie;
        // Génération du PDF après le chargement des détails
        this.generatePdf();
      });
    });
  }
  
  generatePdf() {
    this.rapportService.generatePdf(this.startDate, this.endDate, this.detailEntrees, this.detailSorties);
  }
  
}
