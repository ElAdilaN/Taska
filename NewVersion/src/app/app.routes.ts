import { Routes } from '@angular/router';
import { InscriptionComponent } from './Components/User/inscription/inscription.component';
import { ListsComponent } from './Components/User/lists/lists.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inscription',
    pathMatch: 'full',
  },
  {
    path: 'inscription',
    component: InscriptionComponent,
  },
  {
    path: 'list',
    component: ListsComponent,
  },
];
