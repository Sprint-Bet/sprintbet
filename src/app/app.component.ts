import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PlanningPokerAngular';
  message = 'No messages yet';

  ngOnInit(): void {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44394/notify')
      .configureLogging(signalR.LogLevel.Debug)
      .build();

    connection.start().then(() => {
      console.log('Connected!');
    }).catch((err) => {
      return console.error(err.toString());
    });

    connection.on('BroadcastMessage', (type: string, payload: string) => {
      this.message = payload;
    });
  }
}
