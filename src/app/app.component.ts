import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { IonApp, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuButton, IonMenuToggle, IonNote, IonRouterLink, IonRouterOutlet, IonSplitPane, IonTitle, IonToggle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { archiveOutline, archiveSharp, bookmarkOutline, bookmarkSharp, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonToggle,RouterModule, IonButtons,  IonToolbar, IonToolbar, IonHeader, IonTitle, RouterLink, RouterLinkActive, CommonModule, IonMenuButton, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent { 
  public appPages: Array<{ title: string, url: string, icon: string, role: string[] }> = [];
 

  constructor(public authService: AuthService, private router: Router) {
    this.initializeAppPages();
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
   

  }
  initializeAppPages() {
    const currentUser = this.authService.currentUserValue;

    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    const role = currentUser.role;

    this.appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'home', role: ['ADMIN', 'MANAGER']  }, 
    { title: 'Bon Entrée', url: '/bon-entre-list', icon: 'enter', role: ['MANAGER'] },
    { title: 'Bon Sortie', url: '/bon-sortie-list', icon: 'exit', role: ['VENDEUR', 'ADMIN', 'MANAGER'] },
    { title: 'Fournisseurs', url: '/fournisseurs-list', icon: 'people', role: ['VENDEUR', 'MANAGER'] },
    { title: 'Fournisseurs-Espace', url: '/fournisseurs-espace', icon: 'bookmarks', role: ['VENDEUR', 'MANAGER']},
    { title: 'Notification', url: '/notifications-list', icon: 'notifications', role: ['ADMIN', 'MANAGER', 'VENDEUR'] }
  ].filter(page => page.role.includes(role));
}


  toggleDarkMode(event: any) {
    document.body.classList.toggle('dark', event.detail.checked);
  }

}