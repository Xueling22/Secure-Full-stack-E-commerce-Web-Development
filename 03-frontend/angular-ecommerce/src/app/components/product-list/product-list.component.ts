import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId:number=1;
  searchMode: boolean = false;

  thePageNumber:number=1;
  thePageSize:number=10;
  theTotalElement:number=0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts(){
    const theKeyword:string=this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(theKeyword).subscribe(
      data=>{
        this.products=data;
      }
    );
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }
    //angular会自动复用之前view的component，所以category换了之后，要重新把page重置1
    if(this.previousCategoryId!=this.currentCategoryId){
      this.thePageNumber=1;
    }
    
    this.previousCategoryId=this.currentCategoryId;
    
    
    
    this.productService.getProductListPaginate(this.thePageNumber-1, //这里从pagination组件的1base转到spring data rest的1base
                                              this.thePageSize,
                                              this.currentCategoryId);
  }
}
