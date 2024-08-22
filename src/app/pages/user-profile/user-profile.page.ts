import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent,
  IonHeader, IonIcon,
  IonInput,
  IonItem, IonLabel,
  IonList, IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { UtilisateurService } from "../../services/utilisateur.service";
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonInput, IonButton, IonList, IonCardTitle, IonCardHeader, IonCardContent, IonCard, IonLabel, IonButtons, IonMenuButton, IonIcon]
})
export class UserProfilePage implements OnInit {

  utilisateur: any = {}; // Define the utilisateur object
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private UtilisateurService: UtilisateurService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.id) {
      this.UtilisateurService.getUtilisateurById(currentUser.id).subscribe(
        (data: any) => {
          this.utilisateur = data;
        },
        (error) => {
          console.error('Error fetching user profile', error);
        }
      );
    }
  }

  updateProfile(): void {
    // Vérification de la correspondance des mots de passe
    if (this.newPassword && this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    // Préparation des données de mise à jour
    const updateData: any = {
      ...this.utilisateur
    };

    // Inclure le mot de passe uniquement s'il est fourni
    if (this.newPassword) {
      updateData.password = this.newPassword;
    } else {
      // Si le mot de passe est vide, s'assurer qu'il n'est pas inclus dans les données de mise à jour
      delete updateData.password;
    }

    console.log('Données de mise à jour:', updateData);

    // Appel du service de mise à jour
    this.UtilisateurService.updateUtilisateur(this.utilisateur.id, updateData).subscribe(
      (data) => {
        console.log('Profil utilisateur mis à jour avec succès', data);
        this.router.navigateByUrl('/user-profile');
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du profil utilisateur', error);
        this.errorMessage = 'Une erreur est survenue lors de la mise à jour du profil.';
      }
    );
  }

}
