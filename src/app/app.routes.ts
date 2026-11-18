import { Routes } from '@angular/router';
import { StudiosPageComponent } from './pages/studios-page/studios-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'studios', pathMatch: 'full' },
  { path: 'studios', component: StudiosPageComponent },
  { path: 'products', component: ProductsPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
