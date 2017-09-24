import { Contact } from './../../models/contacts';
import { ContactsService } from './../../services/contacts.service';
import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { PhotosService } from '../../services/photos.service';
import { UsersService } from '../../services/users.service';
import { Photo } from './../../models/photos';
import AuthStore from '../../stores/Auth';
import AuthIdentifiedUser from '../../stores/IdentifiedUser';
import { Router } from '@angular/router';
import { Directive, Output, EventEmitter, Input, SimpleChange } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();
  public token;
  public identified_user;
  public photos: Photo[];
  private dataList: Photo[] = [];
  public contacts: Contact[];
  public url: string;
  public url_user: string;

  ngOnInit() {
  }


  constructor(
    private photosService: PhotosService,
    private userService: UsersService,
    private router: Router,
    private contactService: ContactsService
  ) {
    this.onCreate.emit('dummy');
    this.url = 'http://localhost:3977/api/photo/';
    this.url_user = 'http://localhost:3977/api/user/';
    this.token = AuthStore.getToken();
    this.identified_user = AuthIdentifiedUser.getUserIdentified();
    if (this.token && this.identified_user) {
      this.contactService.getAllContactForUser('59b9717802d64c1188b71eb0')
        .subscribe(
        (contact: Array<Contact>) => {
          this.send_contacts(contact);
        },
        error => {
          console.log(error);
        }, function () {
          console.log('correcto');
        });

    }
  }

  send_contacts(contacts: any) {
    for (var i = 0; i < contacts.length; i++) {
      this.photosService.getAllPhotosForUser(contacts[i]).subscribe((photos: Array<Photo>) => {
        if (photos) {
          console.log('contacto');
          for (var i = 0; i < photos.length; i++) {

            this.dataList.push(photos[i]);
          }
          /*console.log('tiene ' + photos.length);*/
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


}
