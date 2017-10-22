
import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, Input } from '@angular/core';
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
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public token: string;
  public identified_user;
  public photos: Photo[];
  private dataList: Photo[] = [];
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
  public user: User;
  private _files: File[];
  private image_selected: boolean = false;
  public id_user: string;
  myState = 'M';
  states = [{ code: 'M', name: 'Masculino' }, { code: 'F', name: 'Femenino' }, { code: 'I', name: 'Indefinido' }];
  @ViewChild('form') myNgForm;
  @Input() accept: string;
  @Output() onFileSelect: EventEmitter<File[]> = new EventEmitter();
  @ViewChild('inputFile') nativeInputFile: ElementRef;



  constructor(
    private observableMedia: ObservableMedia,
    private photosService: PhotosService,
    private userService: UsersService,
    private router: Router,
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


  selectFile() {
    this.nativeInputFile.nativeElement.click();
  }


  login() {
    this.loginOrRegister = false;
  }


  onNativeInputFileSelect($event) {
    this._files = $event.srcElement.files;
    /*this.onFileSelect.emit(this._files);*/
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = function (e) {
      $('#image').attr('src', myReader.result);

    }
    this.image_selected = true;
    myReader.readAsDataURL(inputValue.files[0]);
  }

  ngOnInit() {

    let user_image = JSON.parse(this.identified_user);
    this.id_user = user_image._id;


    this.loginOrRegister = false;
    this.signinForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    }

    );


    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
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
            if (userWithToken === true) {
              this.token = AuthStore.getToken();
              this.identified_user = AuthIdentifiedUserStore.getUserIdentified();
            } else {
              this.error = 'Username or password is incorrect';
            }
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
    this.userService.createUser(newUser).subscribe(
      (user: User) => {
        this.user = user;
        this.userService.loginUser(newUser).subscribe(
          (userWithToken) => {
            if (userWithToken) {
              if (this.user) {
                this.token = AuthStore.getToken();
                this.fileRequest(
                  this.url_user + 'uploadimage/' + this.user._id,
                  this.token,
                  this._files).then(
                  (result: any) => {
                    console.log(result);
                    this.router.navigate(['home/']);
                  }
                  );

              }
            }
          }, (response: Response) => {
            if (response.status === 500) {
              this.error = 'errorHasOcurred';
            }
          });
        //this.myNgForm.resetForm();
      }, (response: Response) => {
        if (response.status === 500) {
          this.error = 'errorHasOcurred';
        }
      });
  }


  public fileRequest(url: string, token: string, files: Array<File>) {
    return new Promise(function (resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name)
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }

        }
      }
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);

    });

  }







}

