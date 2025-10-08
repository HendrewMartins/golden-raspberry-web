import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'movies',
        loadComponent: () =>
          import('./modules/list/movie-list.component').then(m => m.MovieListComponent)
      }
    ]
  }
];
