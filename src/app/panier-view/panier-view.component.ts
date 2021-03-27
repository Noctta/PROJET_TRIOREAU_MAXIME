import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { DelReference } from 'src/shared/actions/panier.action';

@Component({
  selector: 'app-panier-view',
  templateUrl: './panier-view.component.html',
  styleUrls: ['./panier-view.component.css']
})
export class PanierViewComponent implements OnInit {

  public products;
  constructor(private store: Store) { }

  ngOnInit(): void {
    // console.log(this.store.select(state => state.panier.panier));
    this.products = this.store.select(state => state.panier.panier);
  }

  deleteProduct(p) {
    this.store.dispatch(new DelReference({id: p.id}));
    this.ngOnInit();
  }

}
