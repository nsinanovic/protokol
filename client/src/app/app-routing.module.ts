import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics/statistics.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: 'statistics' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
