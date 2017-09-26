import { Contact } from './../../models/contacts';
import { ContactsService } from './../../services/contacts.service';
import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { PhotosService } from '../../services/photos.service';
import { UsersService } from '../../services/users.service';
import { Photo } from './../../models/photos';
import { User } from './../../models/users';
import AuthStore from '../../stores/Auth';
import AuthIdentifiedUser from '../../stores/IdentifiedUser';
import { Router, ActivatedRoute } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public token;
  public identified_user;
  public photos: Photo[];
  private dataList: Photo[] = [];
  public contacts: Contact[];
  public url: string;
  public url_user: string;
  public open: Observable<boolean>;
  public open_profile: Observable<boolean>;


  ngOnInit() {



    if (this.observableMedia.isActive('xs')) {
      this.open = Observable.of(false);
      this.open_profile = Observable.of(true);
    } else if (this.observableMedia.isActive('sm') || this.observableMedia.isActive('md')) {
      this.open = Observable.of(false);
      this.open_profile = Observable.of(true);
    } else if (this.observableMedia.isActive('lg') || this.observableMedia.isActive('xl')) {
      this.open = Observable.of(true);
      this.open_profile = Observable.of(false);
    }


    // observe changes
    this.observableMedia.asObservable()
      .subscribe(change => {
        switch (change.mqAlias) {
          case 'xs':
            return this.open = Observable.of(false);
          case 'sm':
          case 'md':
            return this.open = Observable.of(false);
          case 'lg':
          case 'xl':
            return this.open = Observable.of(true);
        }
      });

      this.observableMedia.asObservable()
      .subscribe(change => {
        switch (change.mqAlias) {
          case 'xs':
            return this.open_profile = Observable.of(true);
          case 'sm':
          case 'md':
            return this.open_profile = Observable.of(true);
          case 'lg':
          case 'xl':
            return this.open_profile = Observable.of(false);
        }
      });




  }


  constructor(
    private observableMedia: ObservableMedia,
    private photosService: PhotosService,
    private userService: UsersService,
    private router: Router,
    private contactService: ContactsService,
    private route: ActivatedRoute

  ) {
    this.url = 'http://localhost:3977/api/photo/';
    this.url_user = 'http://localhost:3977/api/user/';


    

    this.token = AuthStore.getToken();
    this.identified_user = AuthIdentifiedUser.getUserIdentified();

    if (this.token && this.identified_user) {
      var user = JSON.parse(this.identified_user);
      this.contactService.getAllContactForUser(user._id)
        .subscribe(
        (contact: Array<Contact>) => {
          this.contacts = contact;
          this.send_contacts(contact);
        },
        error => {
          console.log(error);
        }, function () {
          console.log('correcto');
        });

    }



    

  }

  /**
   * Método que obtiene las fotos por contacto
   * @param contacts 
   */
  send_contacts(contacts: any) {
    for (var i = 0; i < contacts.length; i++) {
      this.photosService.getAllPhotosForUser(contacts[i].user_contact).subscribe((photos: Array<Photo>) => {
        if (photos) {
          console.log('contacto');
          for (var i = 0; i < photos.length; i++) {
            this.photos = photos;
            this.dataList.push(photos[i]);
          }
        }
      }, (error) => {
        console.log(error);
      }, function () { console.log('uno mas'); });
    }
  }


  /**
   * Método cerrar sesión
   */
  signOut(): void {
    AuthStore.removeToken();
    AuthIdentifiedUser.removeUserIdentified();
    this.router.navigate(['login/']);
  }

  /**
   * Método que manda al detalle del contacto
   * @param user
   */
  seeAllPhotosUser(user: any): void {
    if (user) {
      this.router.navigate(['contacto/' + user.user._id]);
    }
  }

  /**
   * Método que manda la cuenta principal del usuario logeado
   * @param user
   */
  myAccount(user: any): void {
    if (user) {
      this.router.navigate(['mi-cuenta/' + user.user]);
    }
  }

}
