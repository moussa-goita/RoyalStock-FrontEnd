import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// @ts-ignore
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { IonButton, IonButtons, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonRow, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar } from '@ionic/angular/standalone';
// @ts-ignore
import { addIcons } from 'ionicons';
// @ts-ignore
import { camera, qrCode } from 'ionicons/icons';
import { BonSortie } from 'src/app/models/bon-sortie';
import { DetailSortie } from 'src/app/models/detail-sortie';
import { Produit } from 'src/app/models/produit';
import { AuthService } from 'src/app/services/auth.service';
import { BonSortieDetailService } from 'src/app/services/bon-sortie-detail.service';
import { BonSortieService } from 'src/app/services/bon-sortie.service';
import { ProduitService } from 'src/app/services/produit.service';
import { AlertController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

// @ts-ignore
@Component({
  selector: 'app-bon-sortie-detail',
  templateUrl: './bon-sortie-detail.page.html',
  styleUrls: ['./bon-sortie-detail.page.scss'],
  standalone: true,
  imports: [IonToast,
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
    private authService: AuthService,
    private alertController: AlertController 
  ) {
    this.detailForm = this.fb.group({
      details: this.fb.array([])
    });

    addIcons({ qrCode, camera });
    this.bonSortieId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadProduits();
    this.addDetail();
    this.loadBonSortie();
  }

  get details(): FormArray {
    return this.detailForm.get('details') as FormArray;
  }

  loadProduits(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.entrepot) {
      const entrepotId = currentUser.entrepot.entrepotId;
      this.produitService.getProduitsByEntrepot(entrepotId).subscribe(produits => {
        this.produits = produits;
      }, error => {
        this.errorMessage = 'Erreur lors de la récupération des produits.';
      });
    } else {
      this.errorMessage = 'Erreur: entrepôt utilisateur non trouvé';
    }
  }

  loadBonSortie(): void {
    if (this.bonSortieId) {
      this.bonSortieService.getBonSortieById(this.bonSortieId).subscribe(data => {
        if (data && data.detailsSorties) {
          this.details.clear();
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
      produit: [detail?.produit.productName || '', Validators.required],
      quantity: [detail?.quantity || '', Validators.required],
      prix: [detail?.prix || '', Validators.required]
    }));
  }

  removeDetail(index: number): void {
    this.details.removeAt(index);
  }

  async onSubmit(): Promise<void> {
    if (this.detailForm.valid) {
      const formValue = this.detailForm.value;
  
      try {
        for (const detail of formValue.details) {
          detail.bonSortie = { id: this.bonSortieId } as BonSortie;
  
          try {
            await this.detailSortieService.createDetailSortie(detail).toPromise();
            
            // Affichage de l'alerte après l'enregistrement réussi
            const alert = await this.alertController.create({
              header: 'Succès',
              message: 'Le détail du Bon de Sortie a été ajouté avec succès.',
              buttons: ['OK'],
            });
            await alert.present();
          } catch (err) {
            // Gestion de l'erreur en cas d'échec de l'enregistrement du détail
            let errorMessage = 'Veuillez réessayer.';
  
            if (err instanceof HttpErrorResponse) {
              errorMessage = err.error?.message || 'Erreur lors de l\'ajout du détail du Bon de Sortie.';
            } else if (err instanceof Error) {
              errorMessage = err.message;
            }
  
            const alert = await this.alertController.create({
              header: 'Erreur',
              message: 'Erreur lors de l\'ajout du détail du Bon de Sortie : ' + errorMessage,
              buttons: ['OK'],
            });
            await alert.present();
            console.error('Erreur lors de l\'enregistrement du détail du Bon de Sortie:', err);
          }
        }
  
        // Redirection vers la liste des bons de sortie après l'enregistrement de tous les détails
        this.router.navigate(['/bon-sortie-list']);
      } catch (error) {
        // Gestion de l'erreur en cas de problème général lors de l'enregistrement
        this.errorMessage = 'Une erreur est survenue lors de l\'enregistrement des détails. Veuillez réessayer.';
        console.error('Erreur générale lors de l\'enregistrement des détails du bon de sortie:', error);
      }
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
    }
  }
  
  

  onCancel(): void {
    this.router.navigate(['/bon-sortie-list']);
  }

/*
  async startScan(index: number): Promise<void> {
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
        await BarcodeScanner.hideBackground();
        const result = await BarcodeScanner.startScan();

        if (result.hasContent) {
            this.produitService.getProduitsByQrCode(result.content).subscribe(produit => {
                if (produit) {
                    this.details.at(index).patchValue({ produit: produit.productName });
                    this.infoMessage = 'Produit scanné et trouvé pour ce code QR';
                } else {
                    this.errorMessage = 'Produit non trouvé pour ce code QR';
                }
            }, error => {
                this.errorMessage = 'Erreur lors de la récupération du produit';
            });
        } else {
            this.errorMessage = 'Aucun contenu trouvé dans le code QR';
        }

        await BarcodeScanner.showBackground();
        await BarcodeScanner.stopScan();
    } else if (status.denied) {
        this.errorMessage = 'Permission non accordée pour accéder à la caméra. Veuillez l\'autoriser dans les paramètres.';
    } else {
        this.errorMessage = 'Permission non accordée. Veuillez autoriser l\'accès à la caméra.';
    }
}
*/


}
