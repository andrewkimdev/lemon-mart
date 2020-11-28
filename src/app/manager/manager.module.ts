import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { MaterialModule } from '../material.module';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component';
import { UserManagementComponent } from './user-management/user-management.component';

@NgModule({
  declarations: [
    ManagerHomeComponent,
    ManagerComponent,
    UserManagementComponent,
    ReceiptLookupComponent,
  ],
  imports: [CommonModule, MaterialModule, ManagerRoutingModule],
})
export class ManagerModule { }
