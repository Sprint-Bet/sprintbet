import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { NewVoter } from '../../model/dtos/new-voter';
import { Voter } from '../../model/dtos/voter';
import { Vote } from '@src/app/model/dtos/vote';
import { Room } from '@src/app/model/dtos/room';
import { RoleType } from '@src/app/enums/role-type.enum';
import { ItemsType } from '@src/app/enums/items-type.enum';
import { NewVoterResponse } from '@src/app/model/dtos/new-voter-response';

/**
 * Interface with types copied from '@angular/common/http'
 */
interface Options {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
      [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VoteRepositoryService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
   * Helper method to add auth header to options
   * @param token auth token
   * @param options options that are request-specific
   */
  private optionsWithAuth(token: string, options?: Options): Options {
    if (options) {
      return { ...options, headers: { ...options.headers, 'Authorization' : `Bearer ${token}`}  };
    }

    return { headers: { 'Authorization' : `Bearer ${token}`} };
  }


  /* Voter functions */
  
  registerVoter(newVoter: NewVoter, connectionId: string): Observable<NewVoterResponse> {
    const url = `${environment.apiUrl}/voters`;
    return this.httpClient.post<NewVoterResponse>(url, { ...newVoter, connectionId});
  }

  getVotersForRoom(roomId: string): Observable<Voter[]> {
    const url = `${environment.apiUrl}/voters`;
    return this.httpClient.get<Voter[]>(url, { params: { roomId } });
  }

  castVote(voterId: string, vote: Vote, token: string): Observable<string> {
    const url = `${environment.apiUrl}/voters/${voterId}/point`;
    const options = this.optionsWithAuth(token, { responseType: 'text' as 'json' });
    return this.httpClient.put<string>(url, vote, options);
  }

  changeRole(voterId: string, role: RoleType, token: string): Observable<string> {
    const url = `${environment.apiUrl}/voters/${voterId}/role`;
    const options = this.optionsWithAuth(token);
    return this.httpClient.put<string>(url, { role }, options);
  }

  leaveRoom(voterId: string, connectionId: string, token: string): Observable<HttpResponse<any>> {
    const url = `${environment.apiUrl}/voters/${voterId}`;
    const options: Options = { headers: { connectionId }, observe: 'response' as 'body' };
    return this.httpClient.delete<any>(url, this.optionsWithAuth(token, options));
  }

  reconnectVoter(voterId: string, connectionId: string): Observable<Voter> {
    const url = `${environment.apiUrl}/voters/${voterId}/reconnect`;
    return this.httpClient.get<Voter>(url, { headers: { connectionId } });
  }


  /* Dealer functions */

  createRoom(itemsType: ItemsType, connectionId: string): Observable<Room> {
    const url = `${environment.apiUrl}/rooms`;
    return this.httpClient.post<Room>(url, { itemsType }, { headers: { connectionId } });
  }

  lockVoting(roomId: string): Observable<boolean> {
    const url = `${environment.apiUrl}/rooms/${roomId}/locked`;
    return this.httpClient.put<boolean>(url, { lock: true });
  }

  clearVotes(roomId: string): Observable<boolean> {
    const url = `${environment.apiUrl}/rooms/${roomId}/locked`;
    return this.httpClient.put<boolean>(url, { lock: false });
  }

  changeItems(roomId: string, itemsType: ItemsType): Observable<string[]> {
    const url = `${environment.apiUrl}/rooms/${roomId}/items`;
    return this.httpClient.put<string[]>(url, { itemsType });
  }

  finishGame(roomId: string): Observable<HttpResponse<any>> {
    const url = `${environment.apiUrl}/rooms/${roomId}`;
    return this.httpClient.delete(url, { observe: 'response' });
  }
}
