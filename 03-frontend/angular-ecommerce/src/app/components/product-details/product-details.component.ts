import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!:Product;

  constructor(private productService:ProductService,
              private route:ActivatedRoute,
              private cartService:CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{ //订阅路由参数（paramMap）的变化，然后当变化发生时调用handleProductDetails方法
    this.handleProductDetails();})
  }

  handleProductDetails(){
      const theProductId=+this.route.snapshot.paramMap.get('id')!;//!意思是告诉他可能是null;
      this.productService.getProduct(theProductId).subscribe(
        data=>{
          this.product=data;
        }
      )
  }

  addToCart(){
    console.log("adding inside ok");
    const theCartItem=new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }

}
