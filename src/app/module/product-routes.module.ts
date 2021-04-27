import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from '../components/list/list.component';
import { SearchComponent } from '../components/search/search.component';
import { DetailComponent } from '../components/detail/detail.component';

const appRoutes: Routes = [
  { path: "", component: ListComponent },
  { path: "details/:id", component: DetailComponent }
]

@NgModule({
  declarations: [
    ListComponent,
    SearchComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class ProductRoutesModule { }
