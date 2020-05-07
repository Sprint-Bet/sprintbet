import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { NewVoter } from '../../model/dtos/new-voter';
import { Voter } from '../../model/dtos/voter';
import { Vote } from '@src/app/model/dtos/vote';
import { Room } from '@src/app/model/dtos/room';
import { RoleType } from '@src/app/enums/role-type.enum';

@Injectable({
  providedIn: 'root'
})
export class VoteRepositoryService {
  private baseUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  registerVoter(newVoter: NewVoter, connectionId: string): Observable<Voter> {
    const url = `${this.baseUrl}/voters/register`;
    return this.httpClient.post<Voter>(url, { ...newVoter, connectionId});
  }

  getVotersForRoom(roomId: string): Observable<Voter[]> {
    const url = `${this.baseUrl}/voters`;
    return this.httpClient.get<Voter[]>(url, { params: { roomId } });
  }

  castVote(voterId: string, vote: Vote): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/voters/${voterId}/cast`;
    return this.httpClient.put(url, vote, { observe: 'response' });
  }

  leaveRoom(voterId: string, connectionId: string): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/voters/${voterId}/leave`;
    return this.httpClient.delete(url, { headers: { connectionId }, observe: 'response' });
  }

  changeRole(voterId: string, role: RoleType): Observable<Voter> {
    const url = `${this.baseUrl}/voters/${voterId}/change-role`;
    return this.httpClient.put<Voter>(url, { role });
  }

  createRoom(connectionId: string): Observable<Room> {
    const url = `${this.baseUrl}/rooms/create`;
    return this.httpClient.post<Room>(url, {}, { headers: { connectionId } });
  }

  lockVoting(roomId: string): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/rooms/${roomId}/lock`;
    return this.httpClient.put(url, {}, { observe: 'response' });
  }

  clearVotes(roomId: string): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/rooms/${roomId}/clear`;
    return this.httpClient.put(url, {}, { observe: 'response' });
  }

  finishGame(roomId: string): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/rooms/${roomId}/finish`;
    return this.httpClient.delete(url, { observe: 'response' });
  }
}
