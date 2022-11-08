import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatapageComponent } from './datapage/datapage.component';
import { LoginComponent } from './login/login.component';
import { DashboardGuard } from './services/dashboard.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path:'', component:LoginComponent, pathMatch:'full'
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'signup', component:SignupComponent
  },
  {
    path:'dashboard', 
    component:DatapageComponent,
    canActivate:[DashboardGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
