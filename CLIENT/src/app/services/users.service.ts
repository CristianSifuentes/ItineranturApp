
import { User } from './../models/users';
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AppConfig } from './../config/app.config';
/*import 'rxjs/Rx';*/


@Injectable()
export class UsersService {
  request$: EventEmitter<any>;
  private headers: HttpHeaders;
  private heroesUrl: string;
  private translations: any;

  private handleError(error: any) {
    this.request$.emit('finished');
    if (error instanceof Response) {
      return Observable.throw(error.json()['error'] || 'backend server error');
    }
    return Observable.throw(error || 'backend server error');
  }

  constructor(
    private http: HttpClient,
    private snackBar: MdSnackBar
  ) {
        this.request$ = new EventEmitter();
        this.heroesUrl = 'http://localhost:3977/api/user';
        this.headers = new HttpHeaders({'Content-Type': 'application/json'});
   }


  createUser(user: any): Observable<User> {
    console.log('llego al servicio');
    this.request$.emit('starting');
    return this.http
      .post(this.heroesUrl, JSON.stringify({
        name: user.name,
        lastname: user.lastname,
        nickname: user.nickname,
        age: user.age,
        gender: user.gender,
        email: user.email,
        password: user.password,
        image: user.image,
        /*role: user.role*/
        role: 'TRAVELER'
      }), {headers: this.headers})
      .map(response => {
        this.request$.emit('finished');
        this.showSnackBar('heroCreated');
        return response;
      })
      .catch(error => this.handleError(error));
  }

  showSnackBar(name): void {
    const config: any = new MdSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    /*this.snackBar.open(this.translations[name], 'OK', config);*/
    this.snackBar.open(name, 'OK', config);
  }
}
