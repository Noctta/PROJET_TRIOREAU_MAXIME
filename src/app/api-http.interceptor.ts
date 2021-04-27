import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

  jwtToken : String ="";
  constructor(private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.jwtToken != "") {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${this.jwtToken}` }});
    }
    
    return next.handle(request).pipe(tap(
      (evt : HttpEvent<any>) => {
        if ( evt instanceof HttpResponse){

          let tab : Array<String> ;
          let headerAutorization = evt.headers.get("Authorization");
          
          if (headerAutorization != null ) {
            tab = headerAutorization.split(/Bearer\s+(.*)$/i);
            if (tab.length > 1) {
              this.jwtToken = tab [1]; 
            }
          }else{
            if(evt.status == 202){
              this.jwtToken = "";
              this.router.navigate(['/connexion']);
            }
          }
        }
      }, ( error : HttpErrorResponse ) => {
        switch (error.status) {
          case 401:
            this.router.navigate(['/connexion']);  
            break;
        
          default:
            break;
        }
      }
    ));
  }
}
