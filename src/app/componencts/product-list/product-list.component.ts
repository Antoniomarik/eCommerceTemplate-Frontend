import { Component } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[]=[];
  constructor(private productSerivce: ProductService){}

  ngOnInit():void{
    this.listProducts();
  }

  private listProducts() {
    this.productSerivce.gerProductList().subscribe(
      data =>{
        this.products = data;
      }
    )
  }
}
