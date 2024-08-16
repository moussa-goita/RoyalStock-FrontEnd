import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButtons,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Fournisseur} from "../../../models/fournisseur";
import {FournisseurEspaceService} from "../../../services/fournisseur-espace.service";

@Component({
  selector: 'app-fournisseurs-espace',
  templateUrl: './fournisseurs-espace.page.html',
  styleUrls: ['./fournisseurs-espace.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon, IonCardContent]
})
export class FournisseursEspacePage implements OnInit {
  fournisseurs: Fournisseur[] = [];

  constructor(private fournisseurespaceServie : FournisseurEspaceService) { }

  ngOnInit() {

    this.fournisseurespaceServie.getFournisseurPublic().subscribe(data => {
      this.fournisseurs = data;
      console.log("mes frs public :", this.fournisseurs);
    });
  }

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.round(rating)).fill(0);
  }

}
