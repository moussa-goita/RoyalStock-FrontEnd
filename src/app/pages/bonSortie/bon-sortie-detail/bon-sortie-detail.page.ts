import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IonButton, IonButtons, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera, qrCode } from 'ionicons/icons';
import { BonSortie } from 'src/app/models/bon-sortie';
import { DetailSortie } from 'src/app/models/detail-sortie';
import { Produit } from 'src/app/models/produit';
import { AuthService } from 'src/app/services/auth.service';
import { BonSortieDetailService } from 'src/app/services/bon-sortie-detail.service';
import { BonSortieService } from 'src/app/services/bon-sortie.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-bon-sortie-detail',
  templateUrl: './bon-sortie-detail.page.html',
  styleUrls: ['./bon-sortie-detail.page.scss'],
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
export class BonSortieDetailPage implements OnInit {
  detailForm: FormGroup;
  produits: Produit[] = [];
  infoMessage: string = '';
  errorMessage: string = '';
  bonSortieId: number = 0; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bonSortieService: BonSortieService,
    private produitService: ProduitService,
    private detailSortieService: BonSortieDetailService,
    private authService: AuthService
  ) {
    this.detailForm = this.fb.group({
      details: this.fb.array([])
    });

    addIcons({ qrCode, camera });

    // Récupération de bonSortieId depuis les paramètres de route
    this.bonSortieId = +this.route.snapshot.paramMap.get('id')!;
    this.detailForm = this.fb.group({
      details: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadProduits();
    this.addDetail();
    this.loadBonSortie(); // Appel de la méthode pour charger le bon de sortie avec ses détails

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
      });
    } else {
      this.errorMessage = 'Erreur: entrepôt utilisateur non trouvé';
    }
  }

  // 
  loadBonSortie(): void {
    if (this.bonSortieId) {
      this.bonSortieService.getBonSortieById(this.bonSortieId).subscribe(data => {
        if (data && data.detailsSorties) {
          this.details.clear(); // Assurez-vous de vider le formulaire avant de charger de nouveaux détails
          data.detailsSorties.forEach((detail: DetailSortie) => {
            this.addDetail(detail);
          });
        }
      }, error => {
        console.error('Erreur lors de la récupération du bon de sortie:', error);
        this.errorMessage = 'Erreur lors de la récupération du bon de sortie.';
      });
    }
  }
  

  addDetail(detail?: DetailSortie): void {
    this.details.push(this.fb.group({
      produit: [detail?.produit || '', Validators.required],
      quantity: [detail?.quantity || '', Validators.required],
      prix: [detail?.prix || '', Validators.required]
    }));
  }

  removeDetail(index: number): void {
    this.details.removeAt(index);
  }

  onSubmit(): void {
    if (this.detailForm.valid) {
      const formValue = this.detailForm.value;
      formValue.details.forEach((detail: DetailSortie) => {
        detail.bonSortie = { id: this.bonSortieId } as BonSortie;
        this.detailSortieService.createDetailSortie(detail).subscribe(() => {
          // Optionnel : gérer la confirmation ou redirection après l'enregistrement
        });
      });
      this.router.navigate(['/bon-sortie-list']);
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
    }
  }

  onCancel(): void {
    this.router.navigate(['/bon-sortie-list']);
  }
}
