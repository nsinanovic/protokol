import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { GoogleChartsModule } from 'angular-google-charts';
import { DataTableModule } from "angular-6-datatable";
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { PasswordsComponent } from './passwords/passwords.component';
import { ProjectsComponent } from './projects/projects.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UsersService } from './users/users.service';
import { PasswordsService } from './passwords/passwords.service';
import { ProjectsService } from './projects/projects.service';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    PasswordsComponent,
    UsersComponent,
    LoginComponent,
    ProjectsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/api/auth']
      }
    }),
    GoogleChartsModule,
    DataTableModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    PasswordsService,
    UsersService,
    ProjectsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
