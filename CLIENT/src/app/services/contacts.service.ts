import { Contact } from './../models/contacts';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AppConfig } from './../config/app.config';
import AuthStore from '../stores/Auth';

@Injectable()
export class ContactsService {

  request$: EventEmitter<any>;
  private contactsUrl: string;
  private translations: any;

  private handleError(error: any) {
    this.request$.emit('finished');
    if (error instanceof Response) {
      return Observable.throw(error.json()['error'] || 'backend server error');
    }
    return Observable.throw(error || 'backend server error');
  }

  constructor(
    private http: HttpClient
  ) {

    this.request$ = new EventEmitter();
    this.contactsUrl = 'http://localhost:3977/api/contacts';
  }

  getAllContactForUser(userId: string): Observable<Contact[]> {
    this.request$.emit('starting');
    return this.http
      .get(this.contactsUrl + '/' + userId)
      .map(response => {
        this.request$.emit('finished');
        return response;
      })
      .catch(error => this.handleError(error));
  }

}
