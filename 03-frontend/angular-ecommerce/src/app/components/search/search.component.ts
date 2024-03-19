import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  doSearch(value:string){
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`); //Router 服务提供的方法之一，用于根据提供的 URL 路径进行导航
  }

}
