
import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { PhotosService } from '../../services/photos.service';
import { UsersService } from '../../services/users.service';
import { Photo } from './../../models/photos';
import AuthStore from '../../stores/Auth';
import AuthIdentifiedUser from '../../stores/IdentifiedUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public token;
  public identified_user;
  public photos: Photo[];
  constructor(
    private photosService: PhotosService,
    private userService: UsersService,
    private router: Router
  ) {
    this.photos = this.photosService.getAll();
    this.token = AuthStore.getToken();
    this.identified_user = AuthIdentifiedUser.getUserIdentified();
  }

  ngOnInit() {
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
