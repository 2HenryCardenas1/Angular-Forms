import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(

    private http: HttpClient
  ) { }


  getAllCategories() {
    return this.http.get<Category[]>(`${environment.url_api}/categories`);
  }

  getCategory(id: string) {
    return this.http.get<Category>(`${environment.url_api}/categories/${id}`);
  }

  //Partial es un tipo de dato que permite que los atributos de la interfaz sean opcionales
  createCategory(data: Partial<Category>) {
    return this.http.post<Category>(`${environment.url_api}/categories/`, data);
  }

  updateCategory(id: string, data: Partial<Category>) {

    return this.http.put<Category>(`${environment.url_api}/categories/${id}`, data);
  }

  deleteCategory(id: string) {
    return this.http.delete<Category>(`${environment.url_api}/categories/${id}`);
  }

  checKCategory(name: string) {
    return this.http.post(`${environment.url_api}/categories/availability`, name);
  }


}
