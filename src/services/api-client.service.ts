import { Injectable } from '@angular/core';

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  constructor() {}

  public init() {
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

  public getVideoList() {
    return gapi.client.youtube.channels
      .list({
        part: ['snippet,contentDetails,statistics'],
        id: 'UCNfGAeIGB6qTXkyvlnMv3-g',
      })
      .then((channelData: any) => {
        const playlistId =
          channelData.result.items[0].contentDetails.relatedPlaylists.uploads;
        return gapi.client.youtube.playlistItems.list({
          part: 'snippet',
          playlistId,
          maxResults: 50,
        });
      })
      .then((videoListData: any) => {
        return videoListData;
      })
      .catch((error: Error) => {
        console.error('Execute error', error);
      });
  }
}
