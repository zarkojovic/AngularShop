import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/components/home/home.component";
import {LayoutComponent} from "./layout/components/layout/layout.component";

const routes: Routes = [

  {
    path:"",
    component: LayoutComponent,
    children:[
      // {
      //   path:"",
      //   pathMatch:"full",
      //   redirectTo:"home"
      // },
      {
        path:"",
        loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
