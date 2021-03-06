import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { RequestsComponent } from './components/requests/requests.component';
import { TravellersComponent } from './components/travellers/travellers.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'mi-cuenta', component: MyAccountComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'subir-foto', component: UploadPhotoComponent },
  { path: 'viajeros', component: TravellersComponent },
  { path: 'solicitudes', component: RequestsComponent }

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
