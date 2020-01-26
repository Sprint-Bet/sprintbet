import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Observable, fromEvent, of } from 'rxjs';
import { Vote } from '../model/dtos/vote';
import { environment } from '@src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Voter } from '../model/dtos/voter';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private _connection: HubConnection;
  private baseUrl;

  get connection(): HubConnection {
    if (!this._connection) {
      this._connection = this.signalRSetup();
    }
    return this._connection;
  }

  set connection(connection: HubConnection) {
    this._connection = connection;
  }

  constructor(private http: HttpClient) {
    this.connection.start()
      .then(() => console.log('Connected!'))
      .catch((err) => console.error(err.toString()));
  }

  /**
   * Create the Signal R Hub connection
   */
  signalRSetup(): HubConnection {
    const isMac = window.navigator.platform.includes('Mac');
    this.baseUrl = isMac
      ? environment.apiUrl.mac
      : environment.apiUrl.windows

    const connection = new HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/notify`)
      .configureLogging(LogLevel.Debug)
      .build();

    return connection;
  }

  /**
   * Adds voter to the planning poker game!
   * @param name The user's name supplied on the welcome page
   * @returns The other voters as observable of the dictionary of voters
   */
  setupVoter(name: string): Observable<{ Voter }> {
    const id = this.connection.connectionId;
    return this.http.post<{ Voter }>(`${this.baseUrl}/setup`, { name: name, id: id });
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
