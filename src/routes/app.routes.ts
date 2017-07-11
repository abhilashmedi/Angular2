import { AuthGuard } from './auth-guard.service';
import { CreateUserComponent } from './../Users/createuser.component';
import { UserComponent } from './../Users/users.component';
import { LoginComponent } from './../Login/login.component';
import { WelcomeComponent } from './../Welcome/welcome.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from "../default/default.component";

export const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'login/', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'CreateUser', component: CreateUserComponent, canActivate: [AuthGuard] },
    { path: 'logout', component: LoginComponent, canActivate: [AuthGuard] },
    { path: '**', component: DefaultComponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);