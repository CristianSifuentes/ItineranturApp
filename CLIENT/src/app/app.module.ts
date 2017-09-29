

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule, MdSnackBar } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdProgressBarModule} from '@angular/material';
import { MdSnackBarModule, MdSnackBarConfig } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClient, HttpClientModule} from '@angular/common/http';

/** Componentes */
import { AppComponent } from './app.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { TravellersComponent } from './components/travellers/travellers.component';
import { RequestsComponent } from './components/requests/requests.component';


/* servicios */
import { PhotosService } from './services/photos.service';
import { UsersService } from './services/users.service';
import { ContactsService } from './services/contacts.service';
import { ProgressBarService } from './services/progress-bar.service';



@NgModule({
  declarations: [
    AppComponent,
    MyAccountComponent,
    HomeComponent,
    ContactComponent,
    UploadPhotoComponent,
    TravellersComponent,
    RequestsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MdButtonModule,
    MdCardModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MdProgressBarModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MdSnackBarModule
  ],
  providers: [PhotosService, UsersService, ContactsService, ProgressBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
