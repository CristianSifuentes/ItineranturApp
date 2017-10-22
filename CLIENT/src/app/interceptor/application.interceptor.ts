import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import AuthStore from '../stores/Auth';
import AuthIdentifiedUserStore from '../stores/IdentifiedUser';

@Injectable()
export class application implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authHeader = AuthStore.getToken();

        const authReq = req.clone({
            headers: req.headers.set('Authorization', authHeader)

        })

        return next.handle(authReq);
    }
}