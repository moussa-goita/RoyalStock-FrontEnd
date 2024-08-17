import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
 
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },


  {
    path: 'bon-entre-form',
    loadComponent: () => import('./pages/bonEntre/bon-entre-form/bon-entre-form.page').then( m => m.BonEntreFormPage)
  },
  {
    path: 'bon-entre-list',
    loadComponent: () => import('./pages/bonEntre/bon-entre-list/bon-entre-list.page').then( m => m.BonEntreListPage)
  },
  {
    path: 'bon-entre-detail/:id',
    loadComponent: () => import('./pages/bonEntre/bon-entre-detail/bon-entre-detail.page').then( m => m.BonEntreDetailPage)
  },
  {
    path: 'bon-sortie-detail/:id',
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
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'user-profile',
    loadComponent: () => import('./pages/user-profile/user-profile.page').then( m => m.UserProfilePage)
  } 
]; 
