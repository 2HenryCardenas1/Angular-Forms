import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { CategoriesService } from './../../../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {


  categories: any[] = [];

  constructor(
    private http: HttpClient,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {

    this.listAllCategories();
  }



  listAllCategories() {
    this.categoriesService.getAllCategories()
      .subscribe({
        next: (response) => {
          console.log(response);
          this.categories = response;
        }
      })
  }

}
