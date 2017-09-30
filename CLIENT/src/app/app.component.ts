import { Contact } from './models/contacts';
import { ContactsService } from './services/contacts.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Photo } from './models/photos';
import { User } from './models/users';
import AuthStore from './stores/Auth';
import AuthIdentifiedUserStore from './stores/IdentifiedUser';
import { Router, ActivatedRoute } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ProgressBarService } from './services/progress-bar.service';
import { PhotosService } from './services/photos.service';
import { UsersService } from './services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public token;
  public identified_user;
  public photos: Photo[];
  private dataList: Photo[] = [];
  public contacts: Contact[];
  public url: string;
  public url_user: string;
  public open: Observable<boolean>;
  public open_profile: Observable<boolean>;
  public progressBarMode: string;
  public signinForm: FormGroup;
  public error: string;
  private loginOrRegister: boolean;
  public signupForm: FormGroup;
  public users: User[];
  myState = 'M';
  states = [{ code: 'M', name: 'Masculino' }, { code: 'F', name: 'Femenino' }, { code: 'I', name: 'Indefinido' }];
  @ViewChild('form') myNgForm; // just to call resetForm method
  // Declaramos las variables para jQuery

  constructor(
    private observableMedia: ObservableMedia,
    private photosService: PhotosService,
    private userService: UsersService,
    private router: Router,
    private contactService: ContactsService,
    private route: ActivatedRoute,
    private progressBarService: ProgressBarService,
    private formBuilder: FormBuilder,

  ) {
    this.url = 'http://localhost:3977/api/photo/';
    this.url_user = 'http://localhost:3977/api/user/';
    console.log(this.router.url);
    console.log(this.route.url);
    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });
    this.token = AuthStore.getToken();
    this.identified_user = AuthIdentifiedUserStore.getUserIdentified();

  }

  ngOnInit() {

    this.loginOrRegister = false;
    this.signinForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    }

    );


    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      nickname: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

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

  /**
   * Método cerrar sesión
   */
  signOut(): void {
    AuthStore.removeToken();
    AuthIdentifiedUserStore.removeUserIdentified();
    localStorage.clear();
    this.identified_user = null;
    this.token = null;
    this.router.navigate(['/']);
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

  onActivate(e, mainContainer) {
    //document.querySelector('div.mat-sidenav-content').scrollTop = 0;
  }

  /**
   * Método que valida si exite en usuario y crea un token
   * @param user Objeto del tipo cliente
   */
  loginUser(user: User) {
    this.userService.validateUser(user).subscribe(
      (userWithId) => {
        this.userService.loginUser(user).subscribe(
          (userWithToken) => {
            AuthIdentifiedUserStore.setUserIdentified(JSON.stringify(userWithId));
            AuthStore.setToken(JSON.stringify(userWithToken.token));
            if (userWithId) {
              this.token = AuthStore.getToken();
              this.identified_user = AuthIdentifiedUserStore.getUserIdentified();

              if (this.token && this.identified_user) {
                var user = JSON.parse(this.identified_user);

              }
              /* */
              /*this.router.navigate(['home/' + '59b9717802d64c1188b71eb0']);*/
              //this.router.navigate(['home/'], { queryParams: { id: '59b9717802d64c1188b71eb0' } });
            }

            //this.router.navigate(['home/']);
          }, (response: Response) => {
            if (response.status === 500) {
              this.error = 'errorHasOcurred';
            }
          });
      }, (response: Response) => {
        if (response.status === 500) {
          this.error = 'errorHasOcurred';
        }
      });
  }

  register() {
    this.loginOrRegister = true;
  }

  createUser(newUser: User) {
    this.userService.createUser(newUser).subscribe((newUserWithId) => {
      this.users.push(newUserWithId);
      this.myNgForm.resetForm();
    }, (response: Response) => {
      if (response.status === 500) {
        this.error = 'errorHasOcurred';
      }
    });
  }

  login() {
    this.loginOrRegister = false;
  }

}
