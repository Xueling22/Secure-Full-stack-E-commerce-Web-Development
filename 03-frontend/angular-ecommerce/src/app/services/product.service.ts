import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';


@Injectable({
  providedIn: 'root'  //root means globally全局单例
})
export class ProductService {

  private baseUrl='http://localhost:8080/api/products'; //rest默认返回20个，products？size=100这样返回100
  private categoryUrl=`http://localhost:8080/api/product-category`;

  constructor(private httpClient:HttpClient) { }

  getProductList(theCategoryId:number): Observable<Product[]>{   //Observable是RxJS库中的一个关键概念，代表了一个随时间异步传递数据的集合。在这里，它用于处理异步HTTP请求的响应。
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    
    return this.getProducts(searchUrl);
  }

  getProductListPaginate(thePage:number,thePageSize:number,
                          theCategoryId:number): Observable<GetResponseProducts>{   //Observable是RxJS库中的一个关键概念，代表了一个随时间异步传递数据的集合。在这里，它用于处理异步HTTP请求的响应。
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    +`&page=${thePage}$size=${thePageSize}`;
    
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]>{
    
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(Response=>Response._embedded.productCategory) //外层去掉了，只剩下每个product，是一个大数组
    );
  }

  searchProducts(theKeyword: string) :Observable<Product[]>{
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> { //因为这里observe的就是一个product数组，如果是一个单独的product就不用接口了
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(  //这里的get<GetResponseProducts>，指get<符合结构结构的数据>
      map(Response => Response._embedded.products)
    );
  }

  getProduct(theProductId: number) :Observable<Product>{ //Observable<Product>是返回类型
    const productUrl=`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }
}


//unwrap JSON数据，这里的数据是多个商品，每个商品又很多属性
//这个结构和json文件中的一样，http://localhost:8080/api/products/search/findByNameContaining?name=Beginner
//由于数据包含 _embedded 对象，该对象又包含一个 products 数组，定义一个接口可以明确地描述这种结构，使得在应用中处理这些数据时更加类型安全

interface GetResponseProducts{
  _embedded:{
    products:Product[];
  }
  page:{
    size:number;
    totalElements:number;
    totalPages:number;
    number:number
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}
