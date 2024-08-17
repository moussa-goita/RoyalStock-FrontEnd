import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonButton,
  IonButtons,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
  IonContent, IonDatetime,
  IonGrid,
  IonHeader,
  IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal,
  IonRouterLink, IonRow, IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
// import { getName } from "ionicons/dist/types/components/icon/utils";
import { add, alert, calendar, clipboard, create, document, eye, person, print, trash } from "ionicons/icons";
import { BonEntree } from "../../models/bon-entree";
import { BonSortie } from "../../models/bon-sortie";
import { RapportService } from "../../services/rapport.service";



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

  startDate: string | null = null;
  endDate: string | null = null;


  public lastThreeBonsEntree: BonEntree[] = [];
  public lastThreeBonsSortie: BonSortie[] = [];

  constructor(private rapportService: RapportService) {
    addIcons({
      calendar,print, document, clipboard, person, create, add, eye, trash
    
    });
  }

  ngOnInit() {
    this.loadLastThreeBons();
  }

  loadLastThreeBons() {
    this.rapportService.getLastThreeBonsEntree().subscribe(bonsEntree => {
      this.lastThreeBonsEntree = bonsEntree;
    });

    this.rapportService.getLastThreeBonsSortie().subscribe(bonsSortie => {
      this.lastThreeBonsSortie = bonsSortie;
    });
  }

  onSubmit() {
    if (this.startDate && this.endDate) {
      this.rapportService.generatePdf(this.startDate, this.endDate);
    } else {
      // @ts-ignore
      alert('Veuillez sélectionner les deux dates.');
    }
  }


  // protected readonly getName = getName;
}

