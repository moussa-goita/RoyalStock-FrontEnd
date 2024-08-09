import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-fournisseurs-list',
  templateUrl: './fournisseurs-list.page.html',
  styleUrls: ['./fournisseurs-list.page.scss'],
  standalone: true,
  imports: [IonButtons, IonMenuButton, IonContent, IonMenuButton, IonHeader, IonTitle,  IonToolbar, CommonModule, FormsModule]
})
export class FournisseursListPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
