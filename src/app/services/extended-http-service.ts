import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http,
   RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
// import { AuthService } from './auth/auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

@Injectable()
export class ExtendedHttpService extends Http {

  constructor(backend: XHRBackend, defaultOptions: RequestOptions, private router: Router) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    // do whatever
    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }
      this.setHeaders(options);
    } else {
      this.setHeaders(url);
    }

    return super.request(url, options).catch(this.catchErrors());
  }

  private catchErrors() {
    return (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        // handle authorization errors
        // in this example I am navigating to logout route which brings the login screen
        this.router.navigate(['logout']);
        return Observable.of(res);
      } else {
        return Observable.throw(res);
      }
    };
  }

  private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {

  }
}
