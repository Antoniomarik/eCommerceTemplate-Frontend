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
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //new properties for pagination
  thePageNumber = 1;
  thePageSize = 10;
  theTotalElements = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute){}

  ngOnInit():void{
    this.route.paramMap.subscribe(()=>{
    this.listProducts();
    });
  }

   listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has("keyword");

    if (this.searchMode){
      console.log("entered if")
      this.handleSearchProducts();
    }else{
      console.log("entered else")
    this.handleListProducts();
    }
  }

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id")!;
    }else {
      this.currentCategoryId = 1;
    }
    //check if we have different category than previous
    //Note: Angular will reuse component if it is currently being viewed
    //if we have different category id than previous, reset thePageBumber back to 1
    if (this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`curred id :${this.currentCategoryId}, previous: ${this.previousCategoryId}, pagenum: ${this.thePageNumber}`)

    //new
    this.productService.getProductListPaginate(this.thePageNumber -1,this.thePageSize,this.currentCategoryId).subscribe(
      data => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number +1;
        this.theTotalElements = data.page.totalElements;
        this.thePageSize = data.page.size;
      }
    );

    //get product list for given category id
    //old
    //this.productService.gerProductList(this.currentCategoryId).subscribe(
      //data =>{
        //this.products = data;
      //}
    //)
  }

  private handleSearchProducts() {
    const theKeyword : string = this.route.snapshot.paramMap.get("keyword")!;

    //search for thw product using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
