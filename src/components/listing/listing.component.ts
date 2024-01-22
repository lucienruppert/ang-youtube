import { Component } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'video-list',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent {
  constructor(private ApiClient: ApiClientService) {}

  public videoList: gapi.client.youtube.PlaylistItem[] | undefined;
  public isButtonDisabled: boolean = false;
  public showSpinner: boolean = false;

  public async loadList() {
    try {
      this.showSpinner = true;
      const videoListData = await this.ApiClient.getVideoList();
      if (!videoListData) return;
      this.videoList = videoListData.result.items;
      this.isButtonDisabled = true;
      this.showSpinner = false;
    } catch (error) {
      console.log(error);
    }
  }

  public getURLFor(videoData: gapi.client.youtube.PlaylistItem): string {
    return `https://www.youtube.com/watch?v=${
      videoData.snippet!.resourceId!.videoId
    }`;
  }

  public getTitleFor(videoData: gapi.client.youtube.PlaylistItem): string {
    const title = videoData.snippet!.title!;
    return title.includes('A.J. Christian - ')
      ? title.replace('A.J. Christian - ', '')
      : title;
  }
}
