import { Routes } from '@angular/router';
import {AuthGuard} from "./auth.guard";
import {TabsPage} from "./pages/tabs/tabs.page";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
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
    path: 'notification',
    loadComponent: () => import('./pages/notification/notification.page').then( m => m.NotificationPage), canActivate: [AuthGuard], data: { roles: ['ADMIN', 'MANAGER', 'VENDEUR']}
  },
  {
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
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then( m => m.TabsPage), canActivate: [AuthGuard], data: { roles: ['ADMIN']}
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
];
