import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../services/api-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(
    private ApiClient: ApiClientService
  ) {}

    ngOnInit() {
    // this.ApiClient.loadClient();
  }
}

