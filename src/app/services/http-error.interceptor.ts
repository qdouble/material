import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';



 // don't forget the imports
import { Router } from '@angular/router';
import { AppModule } from '../app.module';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          if (err.status === 401 || err.status === 403) {
            // handle authorization errors
            // in this example I am navigating to logout route which brings the login screen
            const router = AppModule.injector.get(Router);
            router.navigate(['logout']);

            // return Observable.of(new HttpResponse({body: [{name: "Default value..."}]}));
          }
          console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
        }

        // ...optionally return a default fallback value so app can continue (pick one)
        // which could be a default value (which has to be a HttpResponse here)
        // return Observable.of(new HttpResponse({body: [{name: "Default value..."}]}));
        // or simply an empty observable
        return empty();
      })
    );
  }
}
