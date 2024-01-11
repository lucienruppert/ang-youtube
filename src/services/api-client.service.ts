import { Injectable } from '@angular/core';

enum ChannelProperty {
  snippet = 'snippet',
  contentDetails = 'contentDetails',
  statistics = 'statistics',
}

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private static CHANNEL_ID = 'UCNfGAeIGB6qTXkyvlnMv3-g';
  private static CHANNEL_PROPERTIES: Array<ChannelProperty> = [
    ChannelProperty.snippet,
    ChannelProperty.contentDetails,
    ChannelProperty.statistics,
  ];

  public init(): void {
    gapi.load('client', () => {
      gapi.client
        .init({
          apiKey: 'AIzaSyBzYykg8aExJ7z40c4HjGgaMdrRl856FQw',
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
          ],
        })
        .then(() => {
          console.log('YouTube API client loaded.');
        })
        .catch((error: Error) => {
          console.error('Error loading YouTube API client:', error);
        });
    });
  }

  public async getVideoList(): Promise<void | gapi.client.Response<gapi.client.youtube.PlaylistItemListResponse>> {
    try {
      const channelData = await gapi.client.youtube.channels.list({
        part: ApiClientService.CHANNEL_PROPERTIES,
        id: ApiClientService.CHANNEL_ID,
      });
      const playlistId =
        channelData.result.items![0].contentDetails!.relatedPlaylists!.uploads;
      const result = await gapi.client.youtube.playlistItems.list({
        part: 'snippet',
        playlistId,
        maxResults: 50,
      });
      return result;
    } catch (error: unknown) {
      console.error('Execute error', error);
    }
  }
}
