import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { NewVoter } from '../../model/dtos/new-voter';
import { Voter } from '../../model/dtos/voter';

@Injectable({
  providedIn: 'root'
})
export class VoteRepositoryService {
  private baseUrl = environment.apiUrl.mac;

  constructor(
    private httpClient: HttpClient,
  ) { }

  registerVoter(newVoter: NewVoter): Observable<string> {
    const url = `${this.baseUrl}/vote/register`;
    return this.httpClient.post(url, newVoter, {
      responseType: 'text',
    });
  }

  getAllVoters(): Observable<Voter[]> {
    const url = `${this.baseUrl}/vote/voters`;
    return this.httpClient.get<Voter[]>(url);
  }
}
