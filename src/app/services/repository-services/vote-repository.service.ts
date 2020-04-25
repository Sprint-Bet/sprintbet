import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { NewVoter } from '../../model/dtos/new-voter';
import { Voter } from '../../model/dtos/voter';
import { Vote } from '@src/app/model/dtos/vote';
import { VoteHubService } from '../hub-services/vote-hub.service';
import { Room } from '@src/app/model/dtos/room';

@Injectable({
  providedIn: 'root'
})
export class VoteRepositoryService {
  private baseUrl = environment.apiUrl.mac;

  constructor(
    private httpClient: HttpClient,
    private voteHubService: VoteHubService,
  ) { }

  registerVoter(newVoter: NewVoter): Observable<Voter> {
    const url = `${this.baseUrl}/vote/register`;
    return this.httpClient.post<Voter>(url, newVoter);
  }

  getAllVoters(): Observable<Voter[]> {
    const url = `${this.baseUrl}/vote/voters`;
    return this.httpClient.get<Voter[]>(url);
  }

  castVote(voterId: string, vote: Vote): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/vote/voters/${voterId}/cast`;
    return this.httpClient.put(url, vote, { observe: 'response' });
  }

  leaveRoom(voterId: string): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/vote/voters/${voterId}/leave`;
    return this.httpClient.delete(url, { observe: 'response' });
  }

  createRoom(name: string): Observable<Room> {
    const url = `${this.baseUrl}/rooms/create`;
    const connectionId = this.voteHubService.connection.connectionId;
    return this.httpClient.post<Room>(url, { name, connectionId });
  }

  lockVoting(): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/rooms/lock`;
    return this.httpClient.post(url, {}, { observe: 'response' });
  }

  clearVotes(): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/rooms/clear`;
    return this.httpClient.post(url, {}, { observe: 'response' });
  }
}
