import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HerosComponent } from './heros/heros.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HerosDetailsComponent } from './heros-details/heros-details.component';

const routes: Routes = [
  {
  path : "heros",
  component : HerosComponent,
  title : "Heros"
  },
  {
    path : "dashboard",
    component : DashboardComponent,
    title : "Dashboard"
  },
  {
    path : '',
    redirectTo : 'dashboard',
    pathMatch : 'full'
  },
  {
    path : 'heros/detail/:id',
    component : HerosDetailsComponent,
    title : "Hero detail"
  },
  {
    path : 'detail/:id',
    component : HerosDetailsComponent,
    title : "Hero detail"
  },
  {
    path : 'dashboard/detail/:id',
    component : HerosDetailsComponent,
    title : "Hero detail"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
