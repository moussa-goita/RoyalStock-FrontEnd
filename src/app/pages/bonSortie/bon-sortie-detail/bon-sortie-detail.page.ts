import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-bon-sortie-detail',
  templateUrl: './bon-sortie-detail.page.html',
  styleUrls: ['./bon-sortie-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class BonSortieDetailPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
