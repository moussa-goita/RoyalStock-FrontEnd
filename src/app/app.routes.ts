import { Routes } from '@angular/router';
<<<<<<< HEAD
<<<<<<< HEAD
import {AuthGuard} from "./auth.guard";
=======
>>>>>>> goita
=======
import {AuthGuard} from "./auth.guard";
import {TabsPage} from "./pages/tabs/tabs.page";
>>>>>>> origin/master

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
<<<<<<< HEAD
      import('./folder/folder.page').then((m) => m.FolderPage),
  },

  {
    path: 'bon-entre-form',
<<<<<<< HEAD
    loadComponent: () => import('./pages/bonEntre/bon-entre-form/bon-entre-form.page').then( m => m.BonEntreFormPage), data: { roles: ['MANAGER']}
  },
  {
    path: 'bon-entre-list',
    loadComponent: () => import('./pages/bonEntre/bon-entre-list/bon-entre-list.page').then( m => m.BonEntreListPage), data: { roles: ['MANAGER']}
  },
  {
    path: 'bon-entre-detail',
    loadComponent: () => import('./pages/bonEntre/bon-entre-detail/bon-entre-detail.page').then( m => m.BonEntreDetailPage), data: { roles: ['MANAGER']}
  },
  {
    path: 'bon-sortie-detail',
    loadComponent: () => import('./pages/bonSortie/bon-sortie-detail/bon-sortie-detail.page').then( m => m.BonSortieDetailPage), data: { roles: ['VENDEUR', 'MANAGER']}
  },
  {
    path: 'bon-sortie-list',
    loadComponent: () => import('./pages/bonSortie/bon-sortie-list/bon-sortie-list.page').then( m => m.BonSortieListPage), data: { roles: ['VENDEUR', 'MANAGER']}
  },
  {
    path: 'bon-sortie-form',
    loadComponent: () => import('./pages/bonSortie/bon-sortie-form/bon-sortie-form.page').then( m => m.BonSortieFormPage), data: { roles: ['VENDEUR', 'MANAGER']}
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard/dashboard.page').then( m => m.DashboardPage), data: { roles: ['ADMIN', 'VENDEUR', 'MANAGER']}
  },
  {
    path: 'fournisseurs-list',
    loadComponent: () => import('./pages/fournisseurs/fournisseurs-list/fournisseurs-list.page').then( m => m.FournisseursListPage), data: { roles: ['MANAGER']}
  },
  {
    path: 'fournisseurs-form',
    loadComponent: () => import('./pages/fournisseurs/fournisseurs-form/fournisseurs-form.page').then( m => m.FournisseursFormPage), data: { roles: ['MANAGER']}
  },
  {
    path: 'fournisseurs-espace',
    loadComponent: () => import('./pages/fournisseurs/fournisseurs-espace/fournisseurs-espace.page').then( m => m.FournisseursEspacePage), data: { roles: ['MANAGER']}
  },
  {
    path: 'notifications-list',
    loadComponent: () => import('./pages/notifications/notifications-list/notifications-list.page').then( m => m.NotificationsListPage), data: { roles: ['ADMIN', 'VENDEUR', 'MANAGER']}
  },
  {
    path: 'user-profile',
    loadComponent: () => import('./pages/user-profile/user-profile.page').then( m => m.UserProfilePage), data: { roles: ['ADMIN', 'VENDEUR', 'MANAGER']}
=======
      import('./folder/folder.page').then((m) => m.FolderPage), canActivate: [AuthGuard], data: { roles: ['ADMIN']}
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage), canActivate: [AuthGuard], data: { roles: ['ADMIN', 'MANAGER', 'VENDEUR']}
  },
  {
    path: 'bon-entree-list',
    loadComponent: () => import('./pages/bon-entree/list/list.page').then( m => m.ListPage), canActivate: [AuthGuard], data: { roles: ['MANAGER']}
  },
  {
    path: 'bon-entree-print',
    loadComponent: () => import('./pages/bon-entree/print/print.page').then( m => m.PrintPage), canActivate: [AuthGuard], data: { roles: ['MANAGER']}
  },
  {
    path: 'bon-entree-detail',
    loadComponent: () => import('./pages/bon-entree/detail/detail.page').then( m => m.DetailPage), canActivate: [AuthGuard], data: { roles: ['MANAGER']}
  },
  {
    path: 'bon-entree-form',
    loadComponent: () => import('./pages/bon-entree/form/form.page').then( m => m.FormPage), canActivate: [AuthGuard], data: { roles: ['MANAGER']}
  },
  {
    path: 'bon-sortie-list',
    loadComponent: () => import('./pages/bon-sortie/list/list.page').then( m => m.ListPage), canActivate: [AuthGuard], data: { roles: ['VENDEUR', 'MANAGER']}
  },
  {
    path: 'bon-sortie-print',
    loadComponent: () => import('./pages/bon-sortie/print/print.page').then( m => m.PrintPage), canActivate: [AuthGuard], data: { roles: ['VENDEUR', 'MANAGER']}
  },
  {
    path: 'bon-sortie-detail',
    loadComponent: () => import('./pages/bon-sortie/detail/detail.page').then( m => m.DetailPage), canActivate: [AuthGuard], data: { roles: ['VENDEUR', 'MANAGER']}
  },
  {
    path: 'bon-sortie-form',
    loadComponent: () => import('./pages/bon-sortie/form/form.page').then( m => m.FormPage), canActivate: [AuthGuard], data: { roles: ['VENDEUR', 'MANAGER']}
  },
  {
    path: 'fournisseurs',
    loadComponent: () => import('./pages/fournisseurs/fournisseurs.page').then( m => m.FournisseursPage), canActivate: [AuthGuard], data: { roles: ['MANAGER']}
>>>>>>> origin/master
  },
  {
    path: 'espace-fournisseur',
    loadComponent: () => import('./pages/espace-fournisseur/espace-fournisseur.page').then( m => m.EspaceFournisseurPage), canActivate: [AuthGuard], data: { roles: ['VENDEUR', 'MANAGER']}
  },
  {
    path: 'entrepot',
    loadComponent: () => import('./pages/entrepot/entrepot.page').then( m => m.EntrepotPage), canActivate: [AuthGuard], data: { roles: ['ADMIN']}
  },
  {
<<<<<<< HEAD
=======
    path: 'notification',
    loadComponent: () => import('./pages/notification/notification.page').then( m => m.NotificationPage), canActivate: [AuthGuard], data: { roles: ['ADMIN', 'MANAGER', 'VENDEUR']}
  },
  {
>>>>>>> origin/master
    path: 'rapport',
    loadComponent: () => import('./pages/rapport/rapport.page').then( m => m.RapportPage), canActivate: [AuthGuard], data: { roles: ['MANAGER']}
  },
  {
    path: 'produit',
    loadComponent: () => import('./pages/produit/produit.page').then( m => m.ProduitPage), canActivate: [AuthGuard], data: { roles: ['VENDEUR', 'MANAGER']}
  },
  {
    path: 'user-profile',
    loadComponent: () => import('./pages/user-profile/user-profile.page').then( m => m.UserProfilePage), canActivate: [AuthGuard], data: { roles: ['ADMIN', 'MANAGER', 'VENDEUR']}
<<<<<<< HEAD
=======
    loadComponent: () => import('./pages/bonEntre/bon-entre-form/bon-entre-form.page').then( m => m.BonEntreFormPage)
  },
  {
    path: 'bon-entre-list',
    loadComponent: () => import('./pages/bonEntre/bon-entre-list/bon-entre-list.page').then( m => m.BonEntreListPage)
  },
  {
    path: 'bon-entre-detail',
    loadComponent: () => import('./pages/bonEntre/bon-entre-detail/bon-entre-detail.page').then( m => m.BonEntreDetailPage)
  },
  {
    path: 'bon-sortie-detail',
    loadComponent: () => import('./pages/bonSortie/bon-sortie-detail/bon-sortie-detail.page').then( m => m.BonSortieDetailPage)
  },
  {
    path: 'bon-sortie-list',
    loadComponent: () => import('./pages/bonSortie/bon-sortie-list/bon-sortie-list.page').then( m => m.BonSortieListPage)
  },
  {
    path: 'bon-sortie-form',
    loadComponent: () => import('./pages/bonSortie/bon-sortie-form/bon-sortie-form.page').then( m => m.BonSortieFormPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'fournisseurs-list',
    loadComponent: () => import('./pages/fournisseurs/fournisseurs-list/fournisseurs-list.page').then( m => m.FournisseursListPage)
  },
  {
    path: 'fournisseurs-form',
    loadComponent: () => import('./pages/fournisseurs/fournisseurs-form/fournisseurs-form.page').then( m => m.FournisseursFormPage)
  },
  {
    path: 'fournisseurs-espace',
    loadComponent: () => import('./pages/fournisseurs/fournisseurs-espace/fournisseurs-espace.page').then( m => m.FournisseursEspacePage)
  },
  {
    path: 'notifications-list',
    loadComponent: () => import('./pages/notifications/notifications-list/notifications-list.page').then( m => m.NotificationsListPage)
>>>>>>> goita
=======
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then( m => m.TabsPage), canActivate: [AuthGuard], data: { roles: ['ADMIN']}
>>>>>>> origin/master
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
<<<<<<< HEAD
<<<<<<< HEAD
=======
  {
    path: 'user-profile',
    loadComponent: () => import('./pages/user-profile/user-profile.page').then( m => m.UserProfilePage)
  }
>>>>>>> goita
=======
>>>>>>> origin/master
];
