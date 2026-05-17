import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminComponent, AdminDashboardComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AdminModule {}
