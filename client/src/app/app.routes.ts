import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./app.component').then((mod) => mod.AppComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./companies/companies.component').then(
            (mod) => mod.CompaniesComponent,
          ),
      },
    ],
  },
];
