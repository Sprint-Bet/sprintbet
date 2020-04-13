import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Observable, fromEvent, from, of } from 'rxjs';
import { environment } from '@src/environments/environment';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { HubMethods } from '@src/app/model/enums/hubMethods.enum';
import { Voter } from '@src/app/model/dtos/voter';

@Injectable({
  providedIn: 'root'
})
export class VoteHubService {
  private connection: HubConnection;
  private baseUrl: string;

  constructor() {
    this.connection = this.setupConnection();

    // TODO: Consider replacing connectionStarted$ with:
    // - a new startSignalR action
    // - a new listenToHubEvents$ effect for ofType(startSignalR)
    // - listenToHubEvents$ maps to this.startConnection()
    // - checks if connection is ready for event subscriptions
    // - (or this could be a new effect that listens to a new startsignalr success action)
    // - switchMap to listen for voting updates, as normal
    // - update the store with a new votingUpdated({voters: Voter[]}) action
  }

  /**
   * Create the Signal R Hub connection
   */
  setupConnection(): HubConnection {
    const isMac = window.navigator.platform.includes('Mac');
    this.baseUrl = isMac
      ? environment.apiUrl.mac
      : environment.apiUrl.windows;

    const connection = new HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/hub/vote`)
      .configureLogging(LogLevel.Debug)
      .build();

    return connection;
  }

  /**
   * Starts the Signal R Hub connection
   */
  startConnection(): Observable<any> {
    this.connection.onreconnecting(_ => console.log('Reconnecting...'));
    this.connection.onreconnected(id => console.log(`Reconnected: ${id}`));
    this.connection.onclose(error => console.log(`Closing: ${error}`));

    const connectionStarted$ = from(this.connection.start()).pipe(
      catchError(error => {
        console.log(`Connection error: ${error}`);
        return of(error);
      })
    );

    return connectionStarted$;
  }

  /**
   * Adds voter to the room, setups up removing player on disconnect
   * @param name The user's name supplied on the welcome page
   * @returns The other voters as observable of the dictionary of voters
   */

  /*
  setupVoter(name: string): Observable<Voter[]> {
    this.connection.onreconnecting(_ => console.log('Reconnecting...'));
    this.connection.onreconnected(id => console.log(`Reconnected: ${id}`));
    this.connection.onclose(error => console.log(`Closing: ${error}`));

    const startConnection$ = from(this.connection.start()).pipe(
      tap(connection => console.log(`connected: ${connection}`)),
    );

    return startConnection$.pipe(
      switchMap(_ => this.invoke<Voter[]>(HubMethods.SetupPlayer, name)),
    );
  }
  */

  /**
   * Sets up observable to return whatever is requested from signal R Hub
   * @param eventName Name of SignalR Hub event to listen for
   * @returns The return object but as an observable
   */
  listenFor<T>(eventName: string): Observable<T> {
    return fromEvent(this.connection, eventName);
  }

  /**
   * Calls a method on the hub (doesn't wait for response)
   * @param methodName The name of the hub method to call
   * @param args The arguements to be passed to the hub method
   */
  send(methodName: string, args: any) {
    this.connection.send(methodName, args);
  }

  /**
   * Calls a method on the hub and waits for response
   * @param methodName The name of the hub method to call
   * @param args The arguments to be passed to the hub method
   */
  invoke<T>(methodName: string, args: any): Observable<T> {
    return from(this.connection.invoke(methodName, args)).pipe(
      catchError(error => {
        console.error(error.toString());
        return of(null);
      }),
    );
  }
}
