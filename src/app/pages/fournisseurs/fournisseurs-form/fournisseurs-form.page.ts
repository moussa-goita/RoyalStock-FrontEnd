import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-fournisseurs-form',
  templateUrl: './fournisseurs-form.page.html',
  styleUrls: ['./fournisseurs-form.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FournisseursFormPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
