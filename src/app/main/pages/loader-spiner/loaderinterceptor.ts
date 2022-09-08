import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderSpinerService } from './loader-spiner.service';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private _loaderService: LoaderSpinerService) {
    //   alert('sohan')
   }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return Observable.create(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {

                this._loaderService.show();
              observer.next(event);
            }
          },
          err => {
            this._loaderService.hide();
            observer.error(err);
          },
          () => {
            this._loaderService.hide();
            observer.complete();
          });
      // remove request from queue when cancelled
      return () => {
        this._loaderService.hide();
        subscription.unsubscribe();
      };
    });
  }
}