import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = '/api/';
  }

  searchProduct(searchText): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('fullText', searchText);
    return this.http.get(this.url + 'products', { params: httpParams });
  }

  downloadProduct(productId): Observable<any> {
    return this.http.get(this.url + 'download/' + productId);
  }

  getLoginUrl(): Observable<any> {
    return this.http.get(this.url + 'login/');
  }

  authenticated(): Observable<any> {
    return this.http.get(this.url + 'authenticated/');
  }
}
