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
    // This is where you enter the search params that you would like to search for, check out the documentation to see more params.
    httpParams = httpParams.append('fullText', searchText);
    return this.http.get(this.url + 'products', { params: httpParams });
  }

  getProductInfo(id): Observable<any> {
    // Get information from a single product
    return this.http.get(this.url + 'product/' + id);
  }

  downloadFile(productId, fileId): Observable<any> {
    // Response type has to be blob (Binary Large OBject)
    return this.http.get(this.url + 'download/' + productId + '/' + fileId, {responseType: 'blob'});
  }

  // Since we want the server to do the auth things, get the Url from there to.

  getLoginUrl(): Observable<any> {
    return this.http.get(this.url + 'login/');
  }
  // Ask the server if we are authenticated

  authenticated(): Observable<any> {
    return this.http.get(this.url + 'authenticated/');
  }

}
