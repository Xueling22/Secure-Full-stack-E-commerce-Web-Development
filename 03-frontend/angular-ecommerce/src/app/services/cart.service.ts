import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[]=[];
  totalPrice:Subject<number>=new Subject<number>(); //subject是observable的子类，可以发布事件，给所有的subscribes
  totalQuantity:Subject<number>=new Subject<number>();

  constructor() { }

  addToCart(theCartItem:CartItem){
    //检查是否已经有了
    let alreadyExistsInCart:boolean=false;
    let existingCartItem: CartItem | null = null;

    
    if(this.cartItems.length>0){
      //根据id找item
      for(let tempCartItem of this.cartItems){
        if(tempCartItem.id===theCartItem.id){
          existingCartItem=tempCartItem;
          break;
        }
      }
      //检测是否找到了
      alreadyExistsInCart=(existingCartItem!=null);
    }
    if(alreadyExistsInCart){
      //increment the quantity
      existingCartItem!.quantity++;
    }else{
      this.cartItems.push(theCartItem);
    }
    //计算总数
    this.computeCartTotals();
    
  }
  computeCartTotals(){
    throw new Error("Method not implemented");
    
  }
}
