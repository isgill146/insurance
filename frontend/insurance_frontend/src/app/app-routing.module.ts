import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { PolicyComponent } from './components/policy/policy.component';

const routes: Routes = [
  {
    path : 'dashboard', component : DashboardComponent
  },
  {
    path : 'policy', component : PolicyComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
