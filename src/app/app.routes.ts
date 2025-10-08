import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'movies',
        loadComponent: () =>
          import('./modules/list/movie-list.component').then(m => m.MovieListComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/dashboard/movie-dashboard.component').then(m => m.MovieDashboardComponent)
      }
    ]
  }
];
