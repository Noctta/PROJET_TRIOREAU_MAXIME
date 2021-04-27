import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  observable : Observable<any>
  
  nbElementPanier: number = 0;
  constructor(private service: ProductService, private store: Store) { }

  ngOnInit(): void {
    this.store.select(state => state.panier.panier.length).subscribe(l => this.nbElementPanier = l);
  }
}
