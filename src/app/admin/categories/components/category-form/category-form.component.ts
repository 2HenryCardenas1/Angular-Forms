import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Category } from './../../../../core/models/category.model';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;
  flagIsNew: boolean = true;

  // set input category
  @Input()
  set category(data: Category) {
    if (data) {
      this.flagIsNew = false;
      this.form.patchValue(data);
    }
  }

  @Output() createCategory = new EventEmitter();
  @Output() updateCategory = new EventEmitter();




  constructor(
    private formBuilder: FormBuilder,

    private storage: AngularFireStorage,



  ) {
    this.buildForm();
  }


  ngOnInit(): void {


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
      if (this.flagIsNew) {
        this.createCategory.emit(this.form.value);

      } else {
        this.updateCategory.emit(this.form.value);
      }

    } else {
      this.form.markAllAsTouched();
    }

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
