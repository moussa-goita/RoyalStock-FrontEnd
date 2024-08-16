import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntrepotService } from 'src/app/services/entrepot.service';
import { Entrepot } from 'src/app/models/entrepot';
import * as L from 'leaflet';

@Component({
  selector: 'app-entrepots',
  templateUrl: './entrepots.page.html',
  styleUrls: ['./entrepots.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class EntrepotsPage implements OnInit {
  map!: L.Map;
  entrepots: Entrepot[] = [];
  latitude: number = 0; // Initial latitude
  longitude: number = 0; // Initial longitude
  distance: number = 10; // Default search distance

  constructor(private entrepotService: EntrepotService) {}
  ngOnInit() {
    this.loadAllEntrepots();
    
  }

  // ngAfterViewInit() {
    
  // }

  loadAllEntrepots() {
    this.entrepotService.getAllEntrepots().subscribe((data) => {
      this.entrepots = data;
      this.initMap();
      this.loadMarkers();
      
    });
    
    // setTimeout(()=> {

    //   this.initMap();
    // },500);
  }

  initMap() {
    if (this.entrepots.length > 0) {
      const firstEntrepot = this.entrepots[0];
      this.latitude = firstEntrepot.location.coordinates[1];
      this.longitude = firstEntrepot.location.coordinates[0];
    }

    this.map = L.map('map').setView([this.latitude, this.longitude], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(this.map);
}


  loadMarkers() {
    this.entrepots.forEach((entrepot) => {
      const marker = L.marker([entrepot.location.coordinates[1], entrepot.location.coordinates[0]]).addTo(this.map);
      marker.bindPopup(`<b>${entrepot.entrepotName}</b>`).openPopup();
    });
  }

  loadNearbyEntrepots() {
    this.entrepotService.getNearbyEntrepots(this.latitude, this.longitude, this.distance).subscribe((data) => {
      this.entrepots = data;
      this.loadMarkers();
      this.initMap(); // Ensure this is called after loadMaps
    });
  }
}
