import { Photo } from '../models/photos';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import AuthStore from '../stores/Auth';
import { AppConfig } from './../config/app.config';


@Injectable()
export class PhotosService {

  request$: EventEmitter<any>;
  private headers: HttpHeaders;
  private photosUrl: string;
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
    this.photosUrl = 'http://localhost:3977/api/photo';
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': AuthStore.getToken() });
  }

  getAllPhotosForUser(user: string): Observable<Photo[]> {
    this.request$.emit('starting');
    return this.http
      .get(this.photosUrl + '/' + user, { headers: this.headers })
      .map(response => {
        this.request$.emit('finished');
        return response;
      })
      .catch(error => this.handleError(error));
  }

  
  createPhoto(photo: any): Observable<Photo> {
    this.request$.emit('starting');
    return this.http
      .post(this.photosUrl, JSON.stringify({
        name: photo.name,
        description: photo.description,
        user: photo.user,
        image: null
      }), { headers: this.headers })
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
