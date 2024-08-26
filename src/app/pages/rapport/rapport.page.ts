import { Component, OnInit } from '@angular/core';
import { DetailEntree } from "../../models/detail-entree";
import { DetailSortie } from "../../models/detail-sortie";
import { RapportService } from 'src/app/services/rapport.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import {
  IonButton,
  IonButtons,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
  IonContent, IonDatetime,
  IonGrid,
  IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal,
  IonRouterLink, IonRow, IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { BonEntree } from 'src/app/models/bon-entree';
import { BonSortie } from 'src/app/models/bon-sortie';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.page.html',
  styleUrls: ['./rapport.page.scss'],
  standalone: true,
  imports: [
    IonRouterLink,
    IonGrid,
    IonCard,
    IonText,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCardSubtitle,
    IonRow,
    IonCol,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonMenuButton,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonSearchbar,
    IonDatetime,
  ],
})

export class RapportPage implements OnInit {

  startDate: string = '';
  endDate: string = '';

  formattedStartDate: string | null = null;
  formattedEndDate: string | null = null;

  showStartDatePicker = false;
  showEndDatePicker = false;

  public detailEntrees: DetailEntree[] = [];
  public detailSorties: DetailSortie[] = [];

  public lastThreeDetailsEntree: DetailEntree[] = [];
  public lastThreeDetailsSortie: DetailSortie[] = [];

  bonSorties: BonSortie[] = [];
  bonEntree: BonEntree[] = [];
  entrepotId: any;

  constructor(private rapportService: RapportService, private authService: AuthService ) {}

  ngOnInit() {
    this.loadLastThreeDetails();
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.entrepot) {
      this.entrepotId = currentUser.entrepot.entrepotId;
      this.loadLastThreeDetails();
    } else {
      console.error('Erreur: entrepôt utilisateur non trouvé');
    }
  }

  getLastThreeItems(items: any[]): any[] {
    return items
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }

  loadLastThreeDetails() {
    if (!this.entrepotId) {
      console.error('Erreur: ID d\'entrepôt non défini');
      return;
    }

    this.rapportService.getAllDetailsEntree().subscribe(detailsEntree => {
      this.lastThreeDetailsEntree = this.getLastThreeItems(detailsEntree);
    });

    this.rapportService.getAllDetailsSortie().subscribe(detailsSortie => {
      this.lastThreeDetailsSortie = this.getLastThreeItems(detailsSortie);
    });
  }

  onDateChange(event: any, dateType: string) {
    const selectedDate = event.detail.value;
    if (dateType === 'startDate') {
      this.startDate = selectedDate;
      this.formattedStartDate = this.formatDateToDisplay(selectedDate);
      this.showStartDatePicker = false;
    } else if (dateType === 'endDate') {
      this.endDate = selectedDate;
      this.formattedEndDate = this.formatDateToDisplay(selectedDate);
      this.showEndDatePicker = false;
    }
  }

  formatDateToDisplay(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('fr-FR');
  }

  onSubmit() {
    if (this.startDate && this.endDate) {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);

      if (endDate >= startDate) {
        this.loadDetails();
      } else {
        alert('La date de fin ne peut pas être antérieure à la date de début.');
      }
    } else {
      alert('Veuillez sélectionner les deux dates.');
    }
  }

  loadDetails() {
    if (!this.entrepotId) {
      console.error('Erreur: ID d\'entrepôt non défini');
      return;
    }

    if (!this.startDate || !this.endDate) {
      console.error('Erreur: Les dates de début et de fin doivent être définies');
      return;
    }

    const startDate = new Date(this.startDate);
    startDate.setHours(0, 0, 0, 0); // Fixe l'heure à 00:00:00 pour la date de début

    const endDate = new Date(this.endDate);
    endDate.setHours(23, 59, 59, 999); // Fixe l'heure à 23:59:59 pour la date de fin

    console.log('Date de début pour le filtrage:', startDate);
    console.log('Date de fin pour le filtrage:', endDate);

    forkJoin({
      bonsEntree: this.rapportService.getBonEntreesByEntrepots(this.entrepotId),
      bonsSortie: this.rapportService.getBonSortiesByEntrepots(this.entrepotId)
    }).subscribe(({ bonsEntree, bonsSortie }) => {
      console.log('Bons d\'entrée récupérés:', bonsEntree);
      console.log('Bons de sortie récupérés:', bonsSortie);

      const bonsEntreeFiltres = Array.isArray(bonsEntree) ? bonsEntree.filter(bon => {
        const dateBonEntreeStr = bon.dateCommande; // Assurez-vous que bon.dateCommande est bien défini
        const dateBonEntree = new Date(dateBonEntreeStr + 'T00:00:00'); // Convertir LocalDate en Date

        console.log('Date de bon d\'entrée:', dateBonEntreeStr, ' -> ', dateBonEntree);

        return !isNaN(dateBonEntree.getTime()) && dateBonEntree >= startDate && dateBonEntree <= endDate;
      }) : [];

      const bonsSortieFiltres = Array.isArray(bonsSortie) ? bonsSortie.filter(bon => {
        const dateBonSortieStr = bon.dateSortie; // Assurez-vous que bon.dateSortie est bien défini
        const dateBonSortie = new Date(dateBonSortieStr + 'T23:59:59'); // Convertir LocalDate en Date

        console.log('Date de bon de sortie:', dateBonSortieStr, ' -> ', dateBonSortie);

        return !isNaN(dateBonSortie.getTime()) && dateBonSortie >= startDate && dateBonSortie <= endDate;
      }) : [];

      console.log('Nombre de bons d\'entrée après filtrage:', bonsEntreeFiltres.length);
      console.log('Nombre de bons de sortie après filtrage:', bonsSortieFiltres.length);

      if (bonsEntreeFiltres.length === 0 && bonsSortieFiltres.length === 0) {
        alert('Il n\'y a ni bons d\'entrée ni bons de sortie pour la période sélectionnée. Le PDF ne sera pas généré.');
        return;
      }

      this.detailEntrees = bonsEntreeFiltres.flatMap(bon => bon.detailEntrees || []);
      this.detailSorties = bonsSortieFiltres.flatMap(bon => bon.detailsSorties || []);


      console.log('Détails des bons d\'entrée:', this.detailEntrees);
      console.log('Détails des bons de sortie:', this.detailSorties);

      this.generatePdf();
    }, error => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }

  generatePdf() {
    this.rapportService.generatePdf(this.startDate, this.endDate, this.detailEntrees, this.detailSorties);
  }

}
