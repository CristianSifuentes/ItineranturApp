import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AppComponent } from './app.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: HomeComponent },
  { path: 'registrar', component: SignUpComponent },
  { path: 'mi-cuenta/:id', component: MyAccountComponent },
  /*{ path: 'home', component: HomeComponent },*/
  { path: 'contacto/:id', component: ContactComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
