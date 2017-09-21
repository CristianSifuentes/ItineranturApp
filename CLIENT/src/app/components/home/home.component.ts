
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
  public url: string;
  constructor(
    private photosService: PhotosService,
    private userService: UsersService,
    private router: Router
  ) {
    this.url = 'http://localhost:3977/api/photo/';
    this.token = AuthStore.getToken();
    this.identified_user = AuthIdentifiedUser.getUserIdentified();
    if (this.token && this.identified_user) {
      this.photosService.getAllPhotosForUser().subscribe((photos: Array<Photo>) => {
        this.photos = photos;
      });
    }


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
