// rapport.service.ts
import { Injectable } from '@angular/core';
// @ts-ignore
import { jsPDF } from 'jspdf';
import { DetailSortie } from '../models/detail-sortie';
import { DetailEntree } from '../models/detail-entree';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class RapportService {

  private apiUrl = 'http://localhost:8080/api'; // Remplace par l'URL de ton API

  constructor(private http: HttpClient) {}

  getAllDetailsEntree(): Observable<DetailEntree[]> {
    return this.http.get<DetailEntree[]>(`${this.apiUrl}/details-entrees`);
  }

  getAllDetailsSortie(): Observable<DetailSortie[]> {
    return this.http.get<DetailSortie[]>(`${this.apiUrl}/details-sorties`);
  }

  
  getDetailSortie(): Observable<DetailSortie[]> {
    return this.http.get<DetailSortie[]>(`${this.apiUrl}/details-sorties`);
  }

  getDetailEntree(): Observable<DetailEntree[]> {
    return this.http.get<DetailEntree[]>(`${this.apiUrl}/details-entrees`);
  }

generatePdf(startDate: string, endDate: string, detailEntrees: DetailEntree[], detailSorties: DetailSortie[]) {
  const doc = new jsPDF();

  // Titre principal
  doc.setFontSize(16);
  doc.text('Rapport de Stock', 10, 10);

  // Période du rapport
  doc.setFontSize(12);
  doc.text(`Période: ${startDate} - ${endDate}`, 10, 20);

  // Section des Bons d'Entrée
  doc.setFontSize(14);
  doc.text('Détails des Bons d\'Entrée:', 10, 30);

  // Headers du tableau des Bons d'Entrée
  doc.setFontSize(12);
  doc.text('Produit', 10, 40);
  doc.text('Quantité', 80, 40);
  doc.text('Prix Total', 130, 40);

  // Contenu du tableau des Bons d'Entrée
  let yOffset = 50;
  detailEntrees.forEach((detail) => {
    doc.text(detail.produit.productName, 10, yOffset);
    doc.text(detail.quantite.toString(), 80, yOffset);
    doc.text(detail.prix.toString(), 130, yOffset);
    yOffset += 10;
  });

  // Ajoute un espace avant la section suivante
  yOffset += 10;

  // Section des Bons de Sortie
  doc.setFontSize(14);
  doc.text('Détails des Bons de Sortie:', 10, yOffset);
  
  // Headers du tableau des Bons de Sortie
  yOffset += 10;
  doc.setFontSize(12);
  doc.text('Produit', 10, yOffset);
  doc.text('Quantité', 80, yOffset);
  doc.text('Prix Total', 130, yOffset);

  // Contenu du tableau des Bons de Sortie
  yOffset += 10;
  detailSorties.forEach((detail) => {
    doc.text(detail.produit.productName, 10, yOffset);
    doc.text(detail.quantity.toString(), 80, yOffset);
    doc.text(detail.prix.toString(), 130, yOffset);
    yOffset += 10;
  });

  // Sauvegarde le PDF
  doc.save('rapport.pdf');
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
