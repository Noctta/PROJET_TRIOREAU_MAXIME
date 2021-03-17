import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, filter } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts(filter = null){    
    let products = this.http.get(environment.baseUrl);

    if(filter){
      products = products.pipe(map(product =>{
        let temp: any = product;
        return temp.filter(filter);
      }));
    }

    return products
  }
}
