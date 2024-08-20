import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { Entrepot } from '../../models/entrepot';
import { EntrepotService } from '../../services/entrepot.service';
import {IonicModule} from "@ionic/angular";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/images/marker-icon-2x.png',
  iconUrl: 'assets/images/marker-icon.png',
  shadowUrl: 'assets/images/marker-shadow.png'
});

@Component({
  selector: 'app-entrepot',
  templateUrl: './entrepot.page.html',
  styleUrls: ['./entrepot.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class EntrepotPage implements OnInit {

  entrepot: Entrepot[] = [];
  private map: L.Map | any;
  public filteredEntrepots: Entrepot[] = [];
  public searchQuery: string = '';

  constructor(private entrepotService: EntrepotService) {}

  ngOnInit() {
    this.loadEntrepots();
  }

  ionViewDidEnter() {
    this.initializeMap();

    // Attendez une seconde pour vous assurer que la carte est prête
    setTimeout(() => {
      this.addMarkersToMap();
    }, 1000);
  }

  initializeMap() {
    const mapElement = document.getElementById('mapId');
    if (mapElement) {
      this.map = L.map(mapElement).setView([12.6392, -8.0029], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.addMarkersToMap();
    } else {
      console.error('Map container not found');
    }
  }

  loadEntrepots() {
    this.entrepotService.getEntrepots().subscribe(data => {
      this.entrepot = data;
      this.filteredEntrepots = data; // Initialement, tous les entrepôts sont affichés
      this.addMarkersToMap();
    }, error => {
      console.error('Erreur lors de la récupération des entrepôts:', error);
    });
  }

  addMarkersToMap() {
    if (!this.map) {
      console.error('La carte n\'est pas encore initialisée.');
      return;
    }

    this.filteredEntrepots.forEach(entrepot => {
      const marker = L.marker([entrepot.latitude, entrepot.longitude])
        .addTo(this.map)
        .bindPopup(`<b>${entrepot.entrepotName}</b><br>${entrepot.lieu}`);
    });
  }


  filterEntrepots() {
    this.filteredEntrepots = this.entrepot.filter(entrepot =>
      entrepot.entrepotName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.updateMapMarkers();
  }

  updateMapMarkers() {
    // Supprimez les marqueurs actuels
    this.map.eachLayer((layer: L.Layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Ajoutez les marqueurs filtrés
    this.addMarkersToMap();
  }
}
