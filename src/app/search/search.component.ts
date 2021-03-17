import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output()
  filter: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }

  filterChange(){
    let min = parseInt((<any>document.getElementById("minPrice")).value);
    let max = parseInt((<any>document.getElementById("maxPrice")).value);
    let name = (<any>document.getElementById("search")).value.toLowerCase();
    let func;  

    if(name != "" && max != 0){
      func = x => x.name.toLowerCase().includes(name) && x.price >= min && x.price <= max;
    }else if(name == ""){
      func = x => x.price >= min && x.price <= max;
    }else{
      func = x => x.name.toLowerCase().includes(name);
    }
    this.filter.emit(func);
  }

}
