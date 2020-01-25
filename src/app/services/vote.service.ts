import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private _connection: HubConnection;

  public get connection(): HubConnection {
    if (!this._connection) {
      this._connection = this.signalRSetup();
    }

    return this._connection;
  }

  public set connection(connection: HubConnection) {
    this._connection = connection;
  }

  constructor() {
    this.connection.start().then(() => {
      console.log('Connected!');
    }).catch((err) => {
      return console.error(err.toString());
    });
  }

  signalRSetup(): HubConnection {
    const isMac = window.navigator.platform.includes('Mac');
    const url = isMac
      ? 'https://localhost:5001/notify'
      : 'https://localhost:44394/notify';

    const connection = new HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(LogLevel.Debug)
      .build();

    return connection;
  }
}
