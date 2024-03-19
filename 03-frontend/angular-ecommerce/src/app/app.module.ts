import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from'@angular/common/http'
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes=[
  {path:'products/:id',component:ProductDetailsComponent},
  {path:'search/:keyword',component:ProductListComponent},
  {path: 'category/:id',component:ProductListComponent}, //path就是路径，后者是新建一个实例，参数id传递给该组件，这样你就可以在组件内部获取并使用这个值
  {path: 'category',component:ProductListComponent}, //没指定参数，显示所有商品
  {path: 'products',component:ProductListComponent}, //所有产品列表，也是显示所有商品
  {path: '',redirectTo:'/products',pathMatch:'full'}, //不创建实例，直接转到哪里
  {path: '**',redirectTo:'/products',pathMatch:'full'}, //generic wildcard，防止显示404所以给转到一个有效的网站
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
