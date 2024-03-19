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
    let existingCartItem: CartItem | undefined = undefined;

    
    if(this.cartItems.length>0){
      //根据id找item,找到了就返回第一个，找不到返回undefined
      existingCartItem=this.cartItems.find(tempCartItem=>tempCartItem.id===theCartItem.id);


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
    let tatalPriceValue:number=0;
    let totalQuantityValue:number=0;

    for(let currentCartItem of this.cartItems){
      tatalPriceValue+=currentCartItem.quantity*currentCartItem.unitPrice;
      totalQuantityValue+=currentCartItem.quantity;
    }

    this.totalPrice.next(tatalPriceValue); //next()方法是Subject的一部分，用于向所有订阅者（subscribers）发送新的值
    this.totalQuantity.next(totalQuantityValue);
    
  }
}
