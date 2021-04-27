import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";
import { NgxsModule } from '@ngxs/store';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { PanierViewComponent } from './components/panier-view/panier-view.component';
import { ProductRoutesModule } from './module/product-routes.module';
import { PanierState } from 'src/shared/states/panierState';
import { ApiHttpInterceptor } from './api-http.interceptor';
import { ProfilComponent } from './components/profil/profil.component';
import { ConnexionComponent } from './components/connexion/connexion.component';

const appRoutes : Routes = [
  {path:'', component: AccueilComponent},
  {path:'produits', loadChildren: () => import("./module/product-routes.module").then(m => m.ProductRoutesModule)},
  {path:'panier', component: PanierViewComponent},
  {path:'profil', component: ProfilComponent},
  {path:'connexion', component:ConnexionComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    PanierViewComponent,
    ProfilComponent,
    ConnexionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([PanierState])
  ],
  providers: [{provide : HTTP_INTERCEPTORS, useClass : ApiHttpInterceptor, multi : true}],
  bootstrap: [AppComponent]
})
// {provide : HTTP_INTERCEPTORS, useClass : ApiHttpInterceptor, multi : true}
export class AppModule { }
