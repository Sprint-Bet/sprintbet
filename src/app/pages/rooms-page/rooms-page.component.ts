import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {
  name = "NAME";
  point = "POINT";

  constructor() { }

  ngOnInit() {
    this.signalRSetup();
  }

  signalRSetup() {
    const isMac = window.navigator.platform.includes("Mac");
    const url = isMac
      ? 'https://localhost:5001/notify'
      : 'https://localhost:44394/notify';

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(signalR.LogLevel.Debug)
      .build();

    connection.start().then(() => {
      console.log('Connected!');
    }).catch((err) => {
      return console.error(err.toString());
    });

    connection.on('BroadcastVote', (name: string, point: string) => {
      this.name = name;
      this.point = point;
    });
  }
}
