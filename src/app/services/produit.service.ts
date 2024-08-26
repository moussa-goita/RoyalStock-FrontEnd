import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = 'https://192.168.123.35:8443/api/produits';

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  getProduitById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/${id}`);
  }

  // createProduit(produit: Produit): Observable<Produit> {
  //   return this.http.post<Produit>(this.apiUrl, produit);
  // }
 // Méthode pour récupérer les produits d'un entrepôt spécifique

  createProduit(produit: Produit, email: string): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiUrl}/create?email=${email}`, produit);
  }

  getProduitsByEntrepot(entrepotId: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/entrepot/${entrepotId}`);
  }
  // Méthode pour récupérer un produit par son code QR
  getProduitsByQrCode(qrCode: string): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/qr-code/${qrCode}`);
  }

  updateProduit(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/${id}`, produit);
  }

  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
