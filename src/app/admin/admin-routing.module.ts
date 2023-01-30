import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CategoryComponent } from './pages/category/category.component';
import { ColorComponent } from './pages/color/color.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
  {path:'',component:IndexComponent,children:[
    {path:'',component:DashboardComponent},

    // category
    {path:'categories',component:CategoryComponent},

    // color
    {path:'colors',component:ColorComponent},

    // product
    {path:'products',component:ProductComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
