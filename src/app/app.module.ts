import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './componencts/product-list/product-list.component';
import {HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";
import {Routes, RouterModule} from "@angular/router";
import { ProductCategoryMenuComponent } from './componencts/product-category-menu/product-category-menu.component';
import { SearchComponent } from './componencts/search/search.component';
import { ProductDetailsComponent } from './componencts/product-details/product-details.component';

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { CartStatusComponent } from './componencts/cart-status/cart-status.component';
import { CartDetailsComponent } from './componencts/cart-details/cart-details.component';
import { CheckoutComponent } from './componencts/checkout/checkout.component';
import {ReactiveFormsModule} from "@angular/forms";


const routes:Routes = [
  {path:"cart-details", component:CartDetailsComponent},
  {path:"checkout", component:CheckoutComponent},
  {path:"search/:keyword", component:ProductListComponent},
  {path:"products/:id", component:ProductDetailsComponent},
  {path:"category/:id", component:ProductListComponent},
  {path:"category", component:ProductListComponent},
  {path:"products", component:ProductListComponent},
  {path:"", redirectTo: "/products", pathMatch:"full"},
  {path:"**", redirectTo: "/products", pathMatch:"full"},

];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
