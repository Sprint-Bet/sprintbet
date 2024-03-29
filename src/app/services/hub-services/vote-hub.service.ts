import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Observable, fromEvent, from, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

@Injectable({
  providedIn: 'root'
})
export class VoteHubService {
  connection: HubConnection;
  private baseUrl = environment.apiUrl;

  constructor() {
    this.connection = this.setupConnection();
  }

  /**
   * Create the Signal R Hub connection
   */
  setupConnection(): HubConnection {
    const connection = new HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/voteHub`)
      .configureLogging(LogLevel.Debug)
      .withAutomaticReconnect()
      .build();

    return connection;
  }

  /**
   * Starts the Signal R Hub connection
   */
  startConnection(): Observable<void> {
    this.connection.onreconnecting(error => !!error ? console.warn(`Error reconnecting: ${error}`) : console.warn('Reconnecting...'));
    this.connection.onreconnected(id => console.warn(`Reconnected: ${id}`));
    this.connection.onclose(error => !!error && console.warn(`Closing: ${error}`));

    // Trying to avoid timeout disconnect errors
    this.connection.keepAliveIntervalInMilliseconds = 10000;
    this.connection.serverTimeoutInMilliseconds = 60000;

    return from(this.connection.start());
  }

  /**
   * Terminates the signal r connection
   */
  disconnect(): Observable<void> {
    const connectionEnded$ = from(this.connection.stop()).pipe(
      catchError(error => {
        console.log(`Connection stop error: ${error}`);
        return of(error);
      })
    );

    return connectionEnded$;
  }

  /**
   * Runs the provided callback function when the hub event occurs
   * @param hubMethodName hub method name to listen for
   * @param callback handler for when event occurs
   *
   * @example
   * const updatedVotersCallback = (voters: Voter[]) => {
   *   voters.forEach(voter => console.log(voter.name));
   * };
   *
   * this.voteHub.handleEvent<Voter[]>(HubEvents.VotingUpdated, updatedVotersCallback);
   */
  handleEvent<T>(hubMethodName: string, callback: (arg: T) => void) {
    this.connection.on(hubMethodName, callback);
  }

  /**
   * Sets up observable to return whatever is requested from signal R Hub
   * @param eventName Name of SignalR Hub event to listen for
   * @returns The return object but as an observable
   */
  listenFor<T>(eventName: string): Observable<T> {
    return fromEvent(
      this.connection as unknown as FromEventTarget<T>,
      eventName
    );
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
    return from(this.connection.invoke<T>(methodName, args)).pipe(
      catchError(error => {
        console.error(error.toString());
        return of(error);
      }),
    );
  }
}
