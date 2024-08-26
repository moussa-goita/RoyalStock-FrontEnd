// rapport.service.ts
import { Injectable } from '@angular/core';
// @ts-ignore
import { jsPDF } from 'jspdf';
import { DetailSortie } from '../models/detail-sortie';
import { DetailEntree } from '../models/detail-entree';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { BonSortie } from '../models/bon-sortie';
import { BonEntree } from '../models/bon-entree';

@Injectable({
  providedIn: 'root'
})
export class RapportService {


  private apiUrl = 'http://localhost:8080/api'; // Remplace par l'URL de ton API
  private baseUrl = 'http://localhost:8080/api/bon-entrees';
  private apiUrls = 'http://localhost:8080/api/bon-sorties';

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

  getBonSortiesByEntrepots(entrepotId: number): Observable<BonSortie[]> {
    return this.http.get<BonSortie[]>(`${this.apiUrls}/entrepot/${entrepotId}`);
  }
  getBonEntreesByEntrepots(entrepotId: number): Observable<BonEntree[]> {
    return this.http.get<BonEntree[]>(`${this.baseUrl}/entrepot/${entrepotId}`);
  }



  generatePdf(startDate: string, endDate: string, detailEntrees: DetailEntree[], detailSorties: DetailSortie[]) {
    console.log('Méthode generatePdf appelée');
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
      doc.text(detail.quantity ? detail.quantity.toString() : '0', 80, yOffset); // Assurez-vous que quantity existe
      doc.text(detail.prix.toString(), 130, yOffset);
      yOffset += 10;
    });

    // Sauvegarde le PDF
    doc.save('rapport.pdf');
  }




}
