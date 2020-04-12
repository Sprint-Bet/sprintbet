import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Observable, fromEvent, from, of } from 'rxjs';
import { environment } from '@src/environments/environment';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { HubMethods } from '@src/app/model/enums/hubMethods.enum';
import { ActivatedRoute } from '@angular/router';
import { Voter } from '../model/dtos/voter';
import { NewVoter } from '../model/dtos/new-voter';
import { VoteRepositoryService } from './repository-services/vote-repository.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(
    private voteRepositoryService: VoteRepositoryService,
  ) { }

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

}
