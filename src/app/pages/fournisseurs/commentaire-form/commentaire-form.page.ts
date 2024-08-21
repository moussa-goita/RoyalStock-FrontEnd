import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-commentaire-form',
  templateUrl: './commentaire-form.page.html',
  styleUrls: ['./commentaire-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CommentaireFormPage {
  commentaire: string = '';
  note: number = 1;
  fournisseurId: number = 0;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fournisseurService: FournisseurService,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.fournisseurId = +params['id'];
      console.log('Fournisseur ID:', this.fournisseurId);
    });
  }

  submitComment(): void {
    this.fournisseurService.noterFournisseur(this.fournisseurId, this.note, this.commentaire).subscribe(
      response => {
        if (response.commentaire === null) {
          console.warn('Le commentaire est null dans la réponse');
        }
        console.log('Réponse du serveur:', response);
        this.router.navigate(['/fournisseurs-list']);
      },
      error => {
        this.errorMessage = 'Erreur lors de l\'ajout du commentaire et de la note';
        console.error('Erreur lors de l\'ajout du commentaire et de la note:', error);
      }
    );
  }
}
