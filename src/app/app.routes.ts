import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductoComponent } from './components/producto/producto.component';
import { Home2Component } from './components/home2/home2.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Home', component: Home2Component},
  {path: 'Junta', component: ProductoComponent}
]
