import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { IonButton, IonButtons, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonRow, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar } from '@ionic/angular/standalone';
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
    private authService: AuthService
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

  onSubmit(): void {
    if (this.detailForm.valid) {
      const formValue = this.detailForm.value;
      formValue.details.forEach((detail: DetailSortie) => {
        detail.bonSortie = { id: this.bonSortieId } as BonSortie;
        this.detailSortieService.createDetailSortie(detail).subscribe(() => {
          this.router.navigate(['/bon-sortie-list']);
        });
      });
      
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
    }
  }

  onCancel(): void {
    this.router.navigate(['/bon-sortie-list']);
  }

  async startScan(index: number): Promise<void> {
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
      await BarcodeScanner.hideBackground(); 
      const result = await BarcodeScanner.startScan(); 

      if (result.hasContent) {
        const produitScanned = this.produits.find(produit => produit.qrCodeText === result.content);

        if (produitScanned) {
          this.infoMessage = ' pour ce code QR le scannage a demarer';
          this.details.at(index).patchValue({ produit: produitScanned.productName });
          this.infoMessage = 'Produit scanne et trouve pour ce code QR';
        } else {
          this.errorMessage = 'Produit non trouvé pour ce code QR';
        }
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

}
