import { Component } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[]=[];
  currentCategoryId!: number;
  constructor(private productSerivce: ProductService,
              private route: ActivatedRoute){}

  ngOnInit():void{
    this.route.paramMap.subscribe(()=>{
    this.listProducts();
    });
  }

  private listProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

    if(hasCategoryId){
      this.currentCategoryId =+ this.route.snapshot.paramMap.get("id")!;
    }else {
      this.currentCategoryId = 1;
    }

    this.productSerivce.gerProductList(this.currentCategoryId).subscribe(
      data =>{
        this.products = data;
      }
    )
  }
}
