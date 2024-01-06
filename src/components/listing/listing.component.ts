import { Component } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'video-list',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent {
  constructor(private ApiClient: ApiClientService) {}

  private videoListData: any;
  public videoList: any;
  public isButtonDisabled: boolean = false;

  public async getList() {
    this.videoListData = await this.ApiClient.getVideoList();
    this.videoList = this.videoListData.result.items;
    this.isButtonDisabled = true;
  }
}
