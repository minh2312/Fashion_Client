import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    IndexComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
