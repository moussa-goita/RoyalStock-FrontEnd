// rapport.service.ts
import { formatDate } from '@angular/common';
import { HttpClient } from "@angular/common/http";

import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Observable } from "rxjs";
import { BonEntree } from "../models/bon-entree";
import { BonSortie } from "../models/bon-sortie";
import { DetailEntree } from '../models/detail-entree';
import { DetailSortie } from '../models/detail-sortie';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  private apiUrl = 'http://localhost:8080/api'; // Remplace par l'URL de ton API

  constructor(private http: HttpClient) {}

  getLastThreeBonsEntree(): Observable<BonEntree[]> {
    return this.http.get<BonEntree[]>(`${this.apiUrl}/bons-entree?limit=3&sort=dateEntree,desc`);
  }

  getLastThreeBonsSortie(): Observable<BonSortie[]> {
    return this.http.get<BonSortie[]>(`${this.apiUrl}/bons-sortie?limit=3&sort=dateSortie,desc`);
  }

  generatePdf(startDate: string | null, endDate: string | null) {
    if (!startDate || !endDate) {
      alert('Veuillez sélectionner les deux dates.');
      return;
    }

    // Convertir les dates en objets Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Filtrer les données selon l'intervalle de dates
    const filteredDetailSortie = this.getDetailSortie().filter(item =>
      item.bonSortie &&
      new Date(item.bonSortie.dateSortie) >= start &&
      new Date(item.bonSortie.dateSortie) <= end
    );

    const filteredDetailEntree = this.getDetailEntree().filter(item =>
      item.bonEntree &&
      new Date(item.bonEntree.dateCommande) >= start &&
      new Date(item.bonEntree.dateCommande) <= end
    );

    const doc = new jsPDF();
    const margin = 10;
    let y = margin;

    // Titre du document
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text('Rapport Période - ' + formatDate(startDate, 'dd/MM/yyyy', 'en') + ' au ' + formatDate(endDate, 'dd/MM/yyyy', 'en'), margin, y);
    y += 15;

    // Header DetailSortie
    this.addTableHeader(doc, 'Données du DetailSortie:', margin, y);
    y += 25;

    // Données du DetailSortie
    this.addTable(doc, filteredDetailSortie, ['#', 'Produit', 'Quantité', 'Prix'], margin, y);
    y += (filteredDetailSortie.length + 1) * 10 + 10;

    // Ligne de séparation
    doc.setLineWidth(0.5);
    doc.line(margin, y, 200 - margin, y);
    y += 10;

    // Header DetailEntree
    this.addTableHeader(doc, 'Données du DetailEntree:', margin, y);
    y += 25;

    // Données du DetailEntree
    this.addTable(doc, filteredDetailEntree, ['#', 'Produit', 'Quantité', 'Prix'], margin, y);

    // Sauvegarde du fichier
    doc.save(`rapport-periode-${formatDate(startDate, 'dd-MM-yyyy', 'en')}-au-${formatDate(endDate, 'dd-MM-yyyy', 'en')}.pdf`);
  }

  private getDetailSortie(): DetailSortie[] {
    // Implémentez la récupération des données
    return [];
  }

  private getDetailEntree(): DetailEntree[] {
    // Implémentez la récupération des données
    return [];
  }

  private addTableHeader(doc: jsPDF, title: string, margin: number, y: number) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setFillColor(220, 220, 220); // Couleur de fond des en-têtes
    doc.rect(margin, y, 190, 10, 'F'); // Fond de l'en-tête
    doc.setTextColor(0);
    doc.text(title, margin + 5, y + 7);
  }

  private addTable(doc: jsPDF, data: any[], headers: string[], margin: number, y: number) {
    const colWidths = [15, 85, 30, 30]; // Largeurs des colonnes
    const rowHeight = 10;

    // En-tête du tableau
    doc.setFillColor(200, 200, 200); // Couleur de fond des lignes d'en-tête
    doc.setTextColor(0);
    doc.rect(margin, y, colWidths.reduce((a, b) => a + b, 0), rowHeight, 'F');
    headers.forEach((header, i) => {
      doc.text(header, margin + colWidths.slice(0, i).reduce((a, b) => a + b, 0), y + 7);
    });
    y += rowHeight;

    // Données du tableau
    data.forEach((item, index) => {
      doc.rect(margin, y, colWidths.reduce((a, b) => a + b, 0), rowHeight); // Bordure de ligne
      const rowData = [
        (index + 1).toString(),
        item.produit,
        item.quantity !== undefined ? item.quantity.toString() : item.quantite.toString(),
        item.prix.toString()
      ];
      rowData.forEach((text, i) => {
        doc.text(text, margin + colWidths.slice(0, i).reduce((a, b) => a + b, 0), y + 7);
      });
      y += rowHeight;
    });
  }
}