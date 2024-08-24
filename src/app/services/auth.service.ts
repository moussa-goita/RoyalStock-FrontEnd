import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = "https://192.168.123.35:8443/api/utilisateurs";
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;


  constructor(private http: HttpClient, private router: Router) {
    const storedUser = this.isBrowser() ? localStorage.getItem('currentUser') : null;
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }


  public get currentUserValue() {
    return this.currentUserSubject.value;
  }


  login(email: string, password: string) {
    console.log("je suis dans log");
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(data => {
          if (data && data.token && this.isBrowser()) {
            console.log('data:',data);
            localStorage.setItem('currentUser', JSON.stringify(data));
            this.currentUserSubject.next(data);
          }
          return data;
        }),
        catchError(this.handleError)
      );
  }


  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }


  // private handleError(error: HttpErrorResponse) {
  //   let errorMessage = 'An unknown error occurred!';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side errors
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side errors
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   return throwError(errorMessage);
  // }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Erreurs côté client
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      // Erreurs côté serveur
      switch (error.status) {
        case 0: // No connection to the server
          errorMessage = "Le serveur est injoignable. Veuillez vérifier votre connexion Internet.";
          break;
        case 401: // Unauthorized - incorrect email or password
          errorMessage = "Email ou mot de passe incorrect. Veuillez réessayer.";
          break;
        case 403: // Forbidden - access denied
          errorMessage = "Accès refusé. Vous n'avez pas les permissions nécessaires.";
          break;
        case 500: // Internal server error
          errorMessage = "Erreur interne du serveur. Veuillez réessayer plus tard.";
          break;
        default:
          errorMessage = `Code d'erreur : ${error.status}\nMessage : ${error.message}`;
      }
    }
  
    return throwError(errorMessage);
  }
  

  hasRole(role: string): boolean {
    return this.currentUserValue && this.currentUserValue.role && this.currentUserValue.role === role;
  }
}
