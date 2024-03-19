import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {
  
  productCategories: ProductCategory[]=[];

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories(){
    this.productService.getProductCategories().subscribe( //subscribe() 是一个方法，它设置了一个观察者来监听 Observable 提供的数据流。一旦 Observable 发出一个值，比如从服务器端获取到数据，这个观察者就会接收到这个值
      data=>{
        console.log('Product Categories'+JSON.stringify(data)); //这行代码将获取到的数据 data 转换成 JSON 字符串，并在控制台打印出来，前面加上了 'Product Categories' 的文本。这通常用于调试目的，以便开发者可以看到从服务获取的数据内容
        this.productCategories=data;
      }
    )
  }

}
