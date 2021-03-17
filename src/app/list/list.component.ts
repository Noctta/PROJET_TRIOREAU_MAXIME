import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service'
import { Observable, of } from 'rxjs'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  observable : Observable<any>

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.observable = this.service.getProducts(); 
  }

  async getProducts(filter = null){
    this.observable = await this.service.getProducts(filter);
  }
}
