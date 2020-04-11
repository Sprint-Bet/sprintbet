import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Observable, fromEvent, from, of } from 'rxjs';
import { environment } from '@src/environments/environment';
import { switchMap, catchError, tap, switchMapTo } from 'rxjs/operators';
import { HubMethods } from '@src/app/model/enums/hubMethods.enum';
import { ActivatedRoute } from '@angular/router';
import { Voter } from '../model/dtos/voter';
import { NewVoter } from '../model/dtos/new-voter';
import { VoteRepositoryService } from '../repository-services/vote-repository.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private _connection: HubConnection;
  private baseUrl: string;

  get connection(): HubConnection {
    if (!this._connection) {
      this._connection = this.signalRSetup();
    }
    return this._connection;
  }
  set connection(connection: HubConnection) {
    this._connection = connection;
  }

  constructor(
    private route: ActivatedRoute,
    private voteRepositoryService: VoteRepositoryService,
  ) { }

  /**
   * Create the Signal R Hub connection
   */
  signalRSetup(): HubConnection {
    const isMac = window.navigator.platform.includes('Mac');
    this.baseUrl = isMac
      ? environment.apiUrl.mac
      : environment.apiUrl.windows;

    const connection = new HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/notify`)
      .configureLogging(LogLevel.Debug)
      .build();

    return connection;
  }

  /**
   * Adds voter to the room, setups up removing player on disconnect
   * @param name The user's name supplied on the welcome page
   * @returns The other voters as observable of the dictionary of voters
   */
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

  /**
   * Registers a new voter with a post request, returns sessionId token
   * @param newVoter voter info used for setup
   */
  registerVoter(newVoter: NewVoter): Observable<string> {
    return this.voteRepositoryService.registerVoter(newVoter);
  }

  /**
   * Gets all voters from the voter repository
   */
  getAllVoters(): Observable<Voter[]> {
    return this.voteRepositoryService.getAllVoters();
  }

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
