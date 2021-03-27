import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AccueilComponent } from './accueil/accueil.component';
import { PanierViewComponent } from './panier-view/panier-view.component';
import { ProductRoutesModule } from './product-routes.module';
import { PanierState } from 'src/shared/states/panierState';

const appRoutes : Routes = [
  {path:'', component: AccueilComponent},
  {path:'produits', loadChildren: () => import("./product-routes.module").then(m => m.ProductRoutesModule)},
  {path:'panier', component: PanierViewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    PanierViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([PanierState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
