/**
  Dependency imports
*/

import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

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
  product = {id: ''};
  clickedProductId: string;
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

  getMoreInfo(id) {
    this.clickedProductId = id;
    this.loadingProduct = true;
    this.api.getProductInfo(id).subscribe((response) => {
      this.product = response.data;
      console.log(this.results);
      this.loadingProduct = false;
    }, (err) => {
      console.log(err);
      this.loadingProduct = false;
      this.error = err;
    });
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
