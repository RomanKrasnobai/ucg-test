import {Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/user-view/user-view.component').then(m => m.UserViewComponent)
  },
  {
    path: 'user-list',
    loadComponent: () => import('./pages/user-list/user-list.component').then(m => m.UserListComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
