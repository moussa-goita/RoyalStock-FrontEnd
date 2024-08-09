import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-bon-sortie-list',
  templateUrl: './bon-sortie-list.page.html',
  styleUrls: ['./bon-sortie-list.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonTitle, IonMenuButton, IonToolbar, CommonModule, FormsModule]
})
export class BonSortieListPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}