import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { AddReference } from 'src/shared/actions/panier.action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  products : Observable<any>;

  constructor(private route: ActivatedRoute, private pService: ProductService, private store: Store) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => this.products = this.pService.getDetail(p.id));
  }

  addPanier(p){
    this.store.dispatch(new AddReference({id: p.id, brand: p.brand, name: p.name, price: p.price, capacity: p.capacity, image: p.image}))
  }

}
