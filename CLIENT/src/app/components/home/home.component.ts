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

  ngOnInit() {
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


  constructor(
    private photosService: PhotosService,
    private userService: UsersService,
    private router: Router,
    private contactService: ContactsService
  ) {
    this.url = 'http://localhost:3977/api/photo/';
    this.url_user = 'http://localhost:3977/api/user/';

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
