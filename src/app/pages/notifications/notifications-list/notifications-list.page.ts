import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonRow, IonCol, IonGrid, IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { Notification } from 'src/app/models/notification';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.page.html',
  styleUrls: ['./notifications-list.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonBadge, IonGrid, IonCol, IonRow, IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonGrid, IonCol, IonToolbar, CommonModule, FormsModule]
})
export class NotificationsListPage implements OnInit {

  notifications: Notification[] = [];
  currentUser: any;
  alerteCount: number = 0;
  stockAlertCount: number = 0;
  expirationCount: number = 0;
  utilisateurId: number = 0;
  entrepotId: number = 0;

  constructor(
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser) {
      this.utilisateurId = this.currentUser.id;
      this.entrepotId = this.currentUser.entrepot?.entrepotId;
      this.loadNotifications();
      this.countNotifications();
    }
  };
  
  loadNotifications() {
    if (this.utilisateurId && this.entrepotId) {
      this.notificationsService.getNotificationsByUtilisateur(this.utilisateurId).subscribe(userNotifications => {
        this.notificationsService.getNotificationsByEntrepot(this.entrepotId).subscribe(entrepotNotifications => {
          
          let allNotifications: Notification[] = [...userNotifications, ...entrepotNotifications]; 

          if (this.currentUser.role === 'VENDEUR') {
            allNotifications = allNotifications.filter(notification => notification.type !== 'ALERTE');
          }
  
          let uniqueNotifications: Notification[] = allNotifications.reduce((acc: Notification[], current: Notification) => {
            const isDuplicate = acc.some(notification => 
              notification.id === current.id
            );
            if (!isDuplicate) {
              acc.push(current);
            }
            return acc;
          }, []);
          
          this.notifications = uniqueNotifications;
        });
      });
    } else if (this.utilisateurId) {
      this.notificationsService.getNotificationsByUtilisateur(this.utilisateurId).subscribe(data => {
        
        if (this.currentUser.role === 'VENDEUR') {
          data = data.filter(notification => notification.type !== 'ALERTE');
        }
        this.notifications = data;
      });
    } else if (this.entrepotId) {
      this.notificationsService.getNotificationsByEntrepot(this.entrepotId).subscribe(data => {
        
        if (this.currentUser.role === 'VENDEUR') {
          data = data.filter(notification => notification.type !== 'ALERTE');
        }
        this.notifications = data;
      });
    }
  }
  

  countNotifications() {
    this.notificationsService.countNotificationsByType('ALERTE',   this.entrepotId).subscribe(count => {
      this.alerteCount = count;
    });

    this.notificationsService.countNotificationsByType('STOCK_ALERT',   this.entrepotId).subscribe(count => {
      this.stockAlertCount = count;
    });

    this.notificationsService.countNotificationsByType('EXPIRATION',   this.entrepotId).subscribe(count => {
      this.expirationCount = count;
    });
  }

  filterContent(type: string) {
    this.notificationsService.filterNotificationsByType(type, this.entrepotId).subscribe(filteredNotifications => {
      this.notifications = filteredNotifications;
      this.cdRef.detectChanges();
    });
  }
 

}
