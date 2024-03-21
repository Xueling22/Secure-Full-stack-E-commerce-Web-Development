import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[]=[];
  totalPrice:Subject<number>=new BehaviorSubject<number>(0); //subject是observable的子类，可以发布事件，给所有的subscribes
  totalQuantity:Subject<number>=new BehaviorSubject<number>(0);
  //0是这两个BehaviorSubject的初始值。这意味着，当你第一次订阅（subscribe）这个BehaviorSubject时，它会立即发出（emit）这个初始值给订阅者。这是BehaviorSubject与普通Subject的一个主要区别——BehaviorSubject需要一个初始值，并且总是会向新的订阅者发出其最新的值，即使是在订阅之后才发出的值

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

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if(theCartItem.quantity===0){
      this.remove(theCartItem);
    }else{
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {
    const itemIndex=this.cartItems.findIndex(tempCartItem=>tempCartItem.id===theCartItem.id)

    if(itemIndex>-1){
      this.cartItems.splice(itemIndex,1); //第一个参数是要开始删除的项目的索引位置，第二个参数是要删除的项目数量。因此，splice(itemIndex, 1)表示从cartItems数组中移除位于itemIndex位置的1个元素
      this.computeCartTotals();
    }
  }


}
