import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, calendar, clipboard, create, document, eye, person, print, trash } from 'ionicons/icons';

import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonMenuButton,
  IonModal, IonRouterLink, IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-bon-sortie-list',
  templateUrl: './bon-sortie-list.page.html',
  styleUrls: ['./bon-sortie-list.page.scss'],
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
    IonList,
    IonModal,
    IonSearchbar,
  ],
})
export class BonSortieListPage  {
  constructor(private router: Router) {
    addIcons({
      calendar,print, document, clipboard, person, create, add, eye, trash
    
    });
  }

  goToAddForm() {
    console.log('Navigation vers le formulaire');

    this.router.navigate(['/bon-sortie-form']);
    console.log('Navigation vers le Ok');
  }
goToAddDetail(){
  this.router.navigate(['/bon-sortie-detail']);
}
}
