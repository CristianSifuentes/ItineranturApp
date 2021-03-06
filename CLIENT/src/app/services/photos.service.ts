import { Photo } from '../models/photos';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import AuthStore from '../stores/Auth';
import { AppConfig } from './../config/app.config';


@Injectable()
export class PhotosService {

  request$: EventEmitter<any>;
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
  }

  getAllPhotosForUser(user: string): Observable<Photo[]> {
    this.request$.emit('starting');
    return this.http
      .get(this.photosUrl + '/' + user)
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
      }))
      .map(response => {
        this.request$.emit('finished');
        this.showSnackBar('heroCreated');
        return response;
      })
      .catch(error => this.handleError(error));
  }


  /*search(term: string): Observable<Photo[]> {
    let apiURL = `${this.photosUrl}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK`;
    return this.http.get(apiURL)
      .map(res => {
        return res.json().results.map(item => {
          return new SearchItem(
            item.trackName,
            item.artistName,
            item.trackViewUrl,
            item.artworkUrl30,
            item.artistId
          );
        });
      });
  }
*/



  showSnackBar(name): void {
    const config: any = new MdSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    /*this.snackBar.open(this.translations[name], 'OK', config);*/
    this.snackBar.open(name, 'OK', config);
  }

}
