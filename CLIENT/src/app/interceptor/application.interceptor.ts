import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import AuthStore from '../stores/Auth';
import AuthIdentifiedUserStore from '../stores/IdentifiedUser';
import 'rxjs/add/operator/do';

@Injectable()
export class application implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authHeader = AuthStore.getToken();
        const started = Date.now();

        const authReq = req.clone({
            /*headers: req.headers.set('Authorization', authHeader)*/
            headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded')

        });
        /*return next.handle(authReq);*/


        return next
            .handle(authReq)
            .do(event => {
                if (event instanceof HttpResponse) {
                    const elapsed = Date.now() - started;
                    console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
                }
            });

    }
}


/**

return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
        }
      }
    });
 */