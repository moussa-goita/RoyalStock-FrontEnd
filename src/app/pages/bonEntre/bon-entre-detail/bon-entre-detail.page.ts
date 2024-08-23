import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonButton, IonButtons, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera, qrCode } from 'ionicons/icons';
import { BonEntree } from 'src/app/models/bon-entree';
import { DetailEntree } from 'src/app/models/detail-entree';
import { Produit } from 'src/app/models/produit';
import { AuthService } from 'src/app/services/auth.service';
import { DetailEntreeService } from 'src/app/services/bon-entre-detail.service';
import { BonEntreService } from 'src/app/services/bon-entre.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-bon-entre-detail',
  templateUrl: './bon-entre-detail.page.html',
  styleUrls: ['./bon-entre-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonRow,
    IonCol,
    IonIcon,
    ReactiveFormsModule
  ],
})
export class BonEntreDetailPage implements OnInit {
  detailForm: FormGroup;
  produits: Produit[] = [];
  infoMessage: string = '';
  errorMessage: string = '';
  bonEntreeId: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bonEntreService: BonEntreService,
    private produitService: ProduitService,
    private authService: AuthService,
    private detailsEntreeService: DetailEntreeService,
    private alertController: AlertController // Ajout d'AlertController
  ) {
    this.detailForm = this.fb.group({
      details: this.fb.array([])
    });

    addIcons({ qrCode, camera });

    // Récupération de bonEntreeId depuis les paramètres de route
    this.bonEntreeId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadProduits();
    this.addDetail(); // Ajouter un champ de détail par défaut
    this.loadBonEntree(); // Charger le bon d'entrée avec ses détails
  }

  get details(): FormArray {
    return this.detailForm.get('details') as FormArray;
  }

  loadProduits(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.entrepot) {
      const entrepotId = currentUser.entrepot.entrepotId;
      this.produitService.getProduitsByEntrepot(entrepotId).subscribe(produits => {
        if (produits.length === 0) {
          this.infoMessage = 'Aucun produit trouvé pour cet Entrepôt.';
          setTimeout(() => this.infoMessage = '', 2000);
        } else {
          this.produits = produits;
        }
      }, error => {
        console.error('Erreur lors de la récupération des produits:', error);
        this.errorMessage = 'Erreur lors de la récupération des produits.';
        setTimeout(() => this.errorMessage = '', 2000);
      });
    } else {
      this.errorMessage = 'Erreur: entrepôt utilisateur non trouvé';
      setTimeout(() => this.errorMessage = '', 2000);
    }
  }

  loadBonEntree(): void {
    if (this.bonEntreeId) {
      this.bonEntreService.getBonEntreeById(this.bonEntreeId).subscribe(data => {
        if (data && data.detailEntrees) {
          this.details.clear(); // Vider le formulaire avant de charger de nouveaux détails
          data.detailEntrees.forEach((detail: DetailEntree) => {
            this.addDetail(detail);
          });
        }
      }, error => {
        console.error('Erreur lors de la récupération du bon d\'entrée:', error);
        this.errorMessage = 'Erreur lors de la récupération du bon d\'entrée.';
        setTimeout(() => this.errorMessage = '', 2000);
      });
    }
  }

  addDetail(detail?: DetailEntree): void {
    this.details.push(this.fb.group({
      id: [detail?.id || null],
      produit: [detail?.produit?.id || '', Validators.required],
      quantite: [detail?.quantite || '', Validators.required],
      prix: [detail?.prix || '', Validators.required]
    }));
  }

  removeDetail(index: number): void {
    this.details.removeAt(index);
  }

  async showAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Succès',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  onSubmit(): void {
    if (this.detailForm.valid) {
      const formValue = this.detailForm.value;
      console.log('Form Value:', formValue); // Débogage : Afficher les valeurs du formulaire

      let allDetailsAdded = true;

      formValue.details.forEach((detail: any) => {
        const produitId = detail.produit;

        if (produitId === undefined) {
          console.error(`ID du produit non trouvé pour le détail:`, detail);
          this.errorMessage = 'ID du produit non trouvé.';
          setTimeout(() => this.errorMessage = '', 2000);
          allDetailsAdded = false;
          return;
        }

        const produit = this.produits.find(p => p.id === produitId);

        if (!produit) {
          console.error(`Produit avec ID ${produitId} non trouvé`);
          this.errorMessage = 'Produit non trouvé.';
          setTimeout(() => this.errorMessage = '', 2000);
          allDetailsAdded = false;
          return;
        }

        const detailEntree: DetailEntree = {
          id: detail.id || 0,
          quantite: detail.quantite,
          prix: detail.prix,
          produit: produit,
          bonEntree: { id: this.bonEntreeId } as BonEntree
        };

        this.detailsEntreeService.createDetailEntree(detailEntree).subscribe(
          response => {
            console.log('Détail d\'entrée enregistré:', response);
          },
          error => {
            console.error('Erreur lors de l\'enregistrement des détails:', error);
            if (error.error) {
              console.error('Détails de l\'erreur du serveur :', error.error);
            }
            this.errorMessage = 'Erreur lors de l\'enregistrement des détails.';
            setTimeout(() => this.errorMessage = '', 2000);
            allDetailsAdded = false;
          }
        );
      });

      if (allDetailsAdded) {
        this.infoMessage = 'Tous les détails d\'entrée ont été enregistrés avec succès.';
        this.showAlert(this.infoMessage); // Affichage du message d'alerte
        setTimeout(() => this.infoMessage = '', 2000);

        // Redirection après la sauvegarde des détails
        this.router.navigate(['/bon-entre-list']);
      }

    } else {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
      setTimeout(() => this.errorMessage = '', 2000);
    }
  }

  onCancel(): void {
    this.router.navigate(['/bon-entre-list']);
  }
}
