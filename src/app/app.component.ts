import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  title = 'BIMobject Live API Workshop';
  searchText: string;
  results: any[];
  loading: boolean;
  loggedIn = false;
  error: any;


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.authenticated().subscribe((response) => {
      if (response.authenticated) {
        this.loggedIn = true;
      }
    });
  }

  search() {
    this.error = null;
    this.loading = true;
    this.api.searchProduct(this.searchText).subscribe((response) => {
      this.results = response.data;
      this.loading = false;
    }, (err) => {
      console.log('haj');
      this.loading = false;
      this.error = err;
    });
  }

  login() {
    this.api.getLoginUrl().subscribe((response: any) => {
        console.log(response);
        window.location.href = response.url;
    });
  }
}
