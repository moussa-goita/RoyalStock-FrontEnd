import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, tap, throwError} from 'rxjs';
import { Fournisseur } from '../models/fournisseur';
import { catchError, retry } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private baseUrl = 'http://localhost:8080/api/fournisseurs';

  constructor(private http: HttpClient, private toastController: ToastController) { }

  private handleError(error: any): Observable<never> {
    this.presentToast('Erreur de communication avec le serveur.', 'danger');
    return throwError(() => new Error('Erreur de communication'));
  }

  private async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    await toast.present();
  }

  getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.baseUrl}`).pipe(
      retry(2),
      catchError(this.handleError.bind(this))
    );
  }

  getFournisseurById(id: number): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`${this.baseUrl}/${id}`).pipe(
      retry(2),
      catchError(this.handleError.bind(this))
    );
  }

  mettreFournisseurPublic(fournisseurId: number, newStatut: string): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(`${this.baseUrl}/${fournisseurId}/modifier-statut`, newStatut);
  }

  getFournisseursForCurrentUser(entrepotId: number): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.baseUrl}/current?entrepotId=${entrepotId}`).pipe(
      retry(2),
      catchError(this.handleError.bind(this))
    );
  }

  createFournisseur(fournisseur: Fournisseur, email: string): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(`${this.baseUrl}/create?email=${email}`, fournisseur).pipe(
      retry(2),
      catchError(this.handleError.bind(this))
    );
  }

  updateFournisseur(id: number, fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(`${this.baseUrl}/${id}`, fournisseur).pipe(
      retry(2),
      catchError(this.handleError.bind(this))
    );
  }

  deleteFournisseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      retry(2),
      catchError(this.handleError.bind(this))
    );
  }

  noterFournisseur(id: number, note: number, commentaire: string): Observable<Fournisseur> {
    const payload = { note, commentaire };
    return this.http.post<Fournisseur>(`${this.baseUrl}/${id}/noter`, payload).pipe(
      retry(2),
      catchError(this.handleError.bind(this)),
      tap(response => {
        if (!response.commentaire) {
          console.warn('Le commentaire est null dans la réponse');
        }
      })
    );
  }
}
