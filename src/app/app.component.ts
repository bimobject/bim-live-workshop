/**
  Dependency imports
*/

import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { saveAs } from 'file-saver';

/**
  Some framework specific stuff
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  title = 'BIMobject Live API Workshop';
  searchText: string;
  clickedProductId: string;
  product: any;
  results: any[];
  loadingSearchResults: boolean;
  loadingProduct: boolean;
  loggedIn = false;
  error: any;


  constructor(private api: ApiService) { }

  /**
    This runs as soon as the app loads
  */

  ngOnInit() {
    this.api.authenticated().subscribe((response) => {
      if (response.authenticated) {
        this.loggedIn = true;
      }
    });
  }

  /**
    When you click search
  */

  search() {
    this.error = null;
    this.loadingSearchResults = true;
    // Call the service to do the request to our server
    this.api.searchProduct(this.searchText).subscribe((response) => {
      this.results = response.data;
      console.log(this.results);
      this.loadingSearchResults = false;
    }, (err) => {
      console.log(err);
      this.loadingSearchResults = false;
      this.error = err;
    });
  }

  /**
    When you want more info on the product (currently not showing anything)
  */

  getMoreInfo(product) {
    this.clickedProductId = product.id;
    this.loadingProduct = true;
    console.log();
    this.api.getProductInfo(this.clickedProductId).subscribe((response) => {
      console.log(response);
      this.product = response.data;
      this.loadingProduct = false;
    }, (err) => {
      console.log(err);
      this.loadingProduct = false;
      this.error = err;
    });
  }

  downloadFile() {
    const file = this.findFirstBestRfa();
    this.api.downloadFile(this.clickedProductId, file.id).subscribe((response) => {
      const blob = new Blob([response]);
      saveAs(blob, file.name);
      console.log('the file?', response);
    }, (err) => {
      console.log(err);
      this.loadingProduct = false;
      this.error = err;
    });
  }

  findFirstBestRfa() {
    let foundFile = this.product.files.forEach(file => {
      if (file.name.includes('.rfa')) {
        return file;
      }
    });
    // File didn't have RFA, just use first file in list
    if (!foundFile) {
      foundFile = this.product.files[0];
    }
    return foundFile;
  }

  /**
    When you click login
  */

  login() {
    this.api.getLoginUrl().subscribe((response: any) => {
      console.log(response);
      window.location.href = response.url;
    });
  }
}
