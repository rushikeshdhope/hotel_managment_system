import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '../auth.guard';
import { AdminGuard } from '../admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'adminDashboardRoute', pathMatch: 'full' },
  { path: 'adminDashboardRoute', component: AdminDashboardComponent, canActivate: [AdminGuard] },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
