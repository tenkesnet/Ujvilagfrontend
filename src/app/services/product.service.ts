import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string;


  constructor(private http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.baseUrl = baseUrl ? baseUrl : '';
  }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.baseUrl + "/getProducts");
  }
  getProductsById(id: number): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.baseUrl + "/getProductsById/" + id);
  }
  getProductsByIdInStock(productid: number, stockid: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + `/getProductsByIdInStock/${productid}/${stockid}`);
  }
  searchProducts(name: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.baseUrl + "/searchProducts/name/" + name);
  }
  updateProduct(product: Product): void {
    let url = this.baseUrl + '/updateProduct';
    console.log(product);
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    this.http.post(url, JSON.stringify(product), options);
  }
}
