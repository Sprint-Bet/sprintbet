import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NewVoter } from '../../model/dtos/new-voter';
import { Voter } from '../../model/dtos/voter';
import { Vote } from 'src/app/model/dtos/vote';
import { Room } from 'src/app/model/dtos/room';
import { RoleType } from 'src/app/enums/role-type.enum';
import { ItemsType } from 'src/app/enums/items-type.enum';
import { NewRoom } from '@src/app/model/dtos/new-room';

@Injectable({
  providedIn: 'root'
})
export class VoteRepositoryService {
  private baseUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  registerVoter(newVoter: NewVoter, connectionId: string): Observable<Voter> {
    const url = `${this.baseUrl}/voters`;
    return this.httpClient.post<Voter>(url, { ...newVoter, connectionId});
  }

  getVotersForRoom(roomId: string): Observable<Voter[]> {
    const url = `${this.baseUrl}/voters`;
    return this.httpClient.get<Voter[]>(url, { params: { roomId } });
  }

  castVote(voterId: string, vote: Vote): Observable<string> {
    const url = `${this.baseUrl}/voters/${voterId}/point`;
    const options = { responseType: 'text' as 'json'};
    return this.httpClient.put<string>(url, vote, options);
  }

  leaveRoom(voterId: string | undefined, connectionId: string): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/voters/${voterId}`;
    return this.httpClient.delete(url, { headers: { connectionId }, observe: 'response' });
  }

  changeRole(voterId: string | undefined, role: RoleType): Observable<string> {
    const url = `${this.baseUrl}/voters/${voterId}/role`;
    return this.httpClient.put<string>(url, { role });
  }

  createRoom(newRoom: NewRoom, connectionId: string): Observable<Room> {
    const url = `${this.baseUrl}/rooms`;
    return this.httpClient.post<Room>(url, newRoom, { headers: { connectionId } });
  }

  lockVoting(roomId: string): Observable<boolean> {
    const url = `${this.baseUrl}/rooms/${roomId}/locked`;
    return this.httpClient.put<boolean>(url, { lock: true });
  }

  clearVotes(roomId: string): Observable<boolean> {
    const url = `${this.baseUrl}/rooms/${roomId}/locked`;
    return this.httpClient.put<boolean>(url, { lock: false });
  }

  changeItems(roomId: string, itemsType: ItemsType): Observable<string[]> {
    const url = `${this.baseUrl}/rooms/${roomId}/items`;
    return this.httpClient.put<string[]>(url, { itemsType });
  }

  finishGame(roomId: string): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/rooms/${roomId}`;
    return this.httpClient.delete(url, { observe: 'response' });
  }

  reconnectVoter(voterId: string, connectionId: string): Observable<Voter> {
    const url = `${this.baseUrl}/voters/${voterId}/reconnect`;
    return this.httpClient.get<Voter>(url, { headers: { connectionId } });
  }
}
