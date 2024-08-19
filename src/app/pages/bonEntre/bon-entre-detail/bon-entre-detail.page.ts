import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bon-entre-detail',
  templateUrl: './bon-entre-detail.page.html',
  styleUrls: ['./bon-entre-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class BonEntreDetailPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
