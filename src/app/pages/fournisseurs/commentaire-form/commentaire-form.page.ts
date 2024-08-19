import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-commentaire-form',
  templateUrl: './commentaire-form.page.html',
  styleUrls: ['./commentaire-form.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CommentaireFormPage {
  commentaire: string = '';
  note: number = 1;
  fournisseurId: number = 0;  
  constructor(
    private route: ActivatedRoute,
    private fournisseurService: FournisseurService,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.fournisseurId = +params['id'];  
    });
  }

  submitComment(): void {
    this.fournisseurService.noterFournisseur(this.fournisseurId, this.note, this.commentaire).subscribe(
      response => {
        console.log('Commentaire et note ajoutés avec succès', response);
        this.router.navigate(['/fournisseurs-list']);  
      },
      error => {
        console.error('Erreur lors de l\'ajout du commentaire et de la note', error);
      }
    );
  }
}
