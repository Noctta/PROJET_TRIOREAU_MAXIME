import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service'
import { Observable, of } from 'rxjs'
import { AddReference } from 'src/shared/actions/panier.action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  observable : Observable<any>

  constructor(private service: ProductService, private store: Store) { }

  ngOnInit(): void {
    this.observable = this.service.getProducts(); 
  }

  async getProducts(filter = null){
    this.observable = await this.service.getProducts(filter);
  }

  addPanier(p){
    this.store.dispatch(new AddReference({id: p.id, brand: p.brand, name: p.name, price: p.price, capacity: p.capacity}))
  }
}
