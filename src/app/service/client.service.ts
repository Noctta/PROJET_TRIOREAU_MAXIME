import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  public updateClient(client : object) : Observable<any> {
    return this.http.put(environment.baseUrl + "/client", client);
  }

  public getClient() : Observable<any> {
    return this.http.get(environment.baseUrl + "/client");
  }
}
