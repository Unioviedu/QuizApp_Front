import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { routing } from './login.routing';

@NgModule({
  imports: [
    routing,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ], providers: [
    AuthGuard,
    AuthenticationService
  ]
})
export class LoginModule { }
