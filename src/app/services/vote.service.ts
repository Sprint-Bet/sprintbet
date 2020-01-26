import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private _connection: HubConnection;

  get connection(): HubConnection {
    if (!this._connection) {
      this._connection = this.signalRSetup();
    }
    return this._connection;
  }

  set connection(connection: HubConnection) {
    this._connection = connection;
  }

  constructor() {
    this.connection.start()
      .then(() => console.log('Connected!'))
      .catch((err) => console.error(err.toString()));
  }

  /**
   * Create the Signal R Hub connection
   */
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

  /**
   * Sets up observable to return whatever is requested from signal R Hub
   * @param eventName Name of SignalR Hub event to listen for
   * @returns The return object but as an observable
   */
  listenFor<T>(eventName: string): Observable<T> {
    return fromEvent(this.connection, eventName);
  }
}
