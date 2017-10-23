import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import AuthStore from '../stores/Auth';
import AuthIdentifiedUserStore from '../stores/IdentifiedUser';
import 'rxjs/add/operator/do';

@Injectable()
export class application implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        // get the token from a service
        const token: string = AuthStore.getToken();

        // add it if we have one
        if (token) {
            req = req.clone({ headers: req.headers.set('Authorization', token) });
        }


        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        // setting the accept header
        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        return next.handle(req);

        /*return next.handle(req).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                console.log(event);
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    console.log(err);
                    // redirect to the login route
                    // or show a modal
                }
            }
        });*/

        /*const authHeader = AuthStore.getToken();
        const started = Date.now();

        const authReq = req.clone({
            headers: req.headers.set('Authorization', authHeader)

        });


        return next
            .handle(authReq)
            .do(event => {
                if (event instanceof HttpResponse) {
                    const elapsed = Date.now() - started;
                    console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
                }
            });*/

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