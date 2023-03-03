import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CategoriesService } from './../../../../core/services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;
  categoryId: string;
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,


  ) {
    this.buildForm();
  }


  ngOnInit(): void {

    //capturamos el id de la categoria
    this.route.params.subscribe((params: Params) => {
      this.categoryId = params.id;
      if (this.categoryId) {
        this.getCategory();
      }
    })

  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
    }
    );
  }

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }


  saveCategory() {

    if (this.form.valid) {
      if (this.categoryId) {

        this.updateCategory();
      } else {
        this.createCategory();
      }

    } else {
      this.form.markAllAsTouched();
    }

  }

  private updateCategory() {
    const data = this.form.value;
    this.categoriesService.updateCategory(this.categoryId, data)
      .subscribe({
        next: (response) => {

          this.router.navigate(['admin/categories']);
        }
      })
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


  private getCategory() {
    this.categoriesService.getCategory(this.categoryId)
      .subscribe({
        next: (response) => {

          this.form.patchValue(response);
        }
      })
  }

  // upload file to firebase storage

  uploadFile(event: any) {
    let file = 0;
    const image = event.target.files[0];
    const name = `category${file + 1}.png`;

    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

    task.snapshotChanges()
      .pipe(
        finalize(() => {

          const url_image$ = ref.getDownloadURL()
          url_image$.subscribe((url) => {

            console.log(url)

            this.imageField.setValue(url);
          });

        }
        )
      )

      .subscribe();
  }






}
