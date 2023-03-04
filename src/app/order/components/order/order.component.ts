import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { Product } from './../../../core/models/product.model';
import { CartService } from './../../../core/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$: Observable<Product[]>;
  form : FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.products$ = this.cartService.cart$;
    this.buildForm();
  }

  ngOnInit() {
  }


  private buildForm() {
    this.form = this.formBuilder.group({
      name : ['',[Validators.required]],
      address : this.formBuilder.array([]) // Array of addresses
    });
  }


  //create address form
  addAddressField() {
    this.addressField.push(this.createAddress());
  }

  private createAddress() {
    return this.formBuilder.group({
      zipCode : ['',[Validators.required]],
      text : ['',[Validators.required]]
    });
  }


  saveOrder() {
    console.log(this.form.value)
  }


  get nameField() {
    return this.form.get('name');
  }

  get addressField() {
    return this.form.get('address') as FormArray;
  }

}
