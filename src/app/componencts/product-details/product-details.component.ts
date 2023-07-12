import { Component } from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product!: Product;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit():void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  private handleProductDetails() {
    //get id and convert it to number with + symbol
    const theProductID: number = +this.route.snapshot.paramMap.get("id")!;
    this.productService.getProduct(theProductID).subscribe(
      data => {
        this.product = data;
      }
    )
  }
}
