import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  public login(login : string, password : string) : Observable<any> {
    return this.http.post(environment.baseUrl + "/login", {"login":login,"password":password});
  }

  public logout() : Observable<any> {
    return this.http.post(environment.baseUrl + "/logout", {});
  }
}
