

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
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';


/* servicios */
import { PhotosService } from './services/photos.service';
import { UsersService } from './services/users.service';
import { ContactsService } from './services/contacts.service';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    MyAccountComponent,
    HomeComponent,
    ContactComponent
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
  providers: [PhotosService, UsersService, ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
