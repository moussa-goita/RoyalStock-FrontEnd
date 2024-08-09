import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-bon-sortie-form',
  templateUrl: './bon-sortie-form.page.html',
  styleUrls: ['./bon-sortie-form.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class BonSortieFormPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
