import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from './../../../../core/services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router

  ) {
    this.buildForm();
  }


  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }


  saveCategory() {

    if (this.form.valid) {
      this.createCategory();
    } else {
      this.form.markAllAsTouched();
    }

  }


  private createCategory() {
    const data = this.form.value;
    this.categoriesService.createCategory(data)
      .subscribe({
        next: (response) => {
          
          this.router.navigate(['admin/categories']);
        }
      })

  }



}
