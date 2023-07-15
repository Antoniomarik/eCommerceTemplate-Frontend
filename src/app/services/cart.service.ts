import { Injectable } from '@angular/core';
import {CartItem} from "../common/cart-item";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  constructor() { }


  addToCart(theCartItem: CartItem){
    //check if already have this item in out cart
    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length > 0 ){
      //find the item in the card based on item id
      //if < oldway
     // for (let tempCartItem of this.cartItems){
        //if (tempCartItem.id === theCartItem.id){
          //existingCartItem = tempCartItem;
          //break;
        //}
        //new way
      //}
      //new way
      existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id );
      //check if we found it
      alreadyExistInCart = (existingCartItem != undefined);
    }

    if(alreadyExistInCart){
      existingCartItem.quantity++;
    }else {
      this.cartItems.push(theCartItem);
    }

    //compute cart total price and total quantity
    this.computeCartTotals();

    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }


    console.log('----');
  }

   computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    //publist new values

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
     for(let x of this.cartItems){
       console.log(x.name);
     }
    //log cart data for debuging - tbd

  }
}
