import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { VoteService } from '@src/app/services/vote.service';
import { Vote } from '@src/app/model/dtos/vote';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {
  name = 'NAME';
  point = 'POINT';
  connection: signalR.HubConnection;

  constructor(
    private voteService: VoteService,
  ) { }

  ngOnInit() {
    this.connection = this.voteService.connection;

    this.connection.on('BroadcastVote', (vote: Vote) => {
      this.name = vote.name;
      this.point = vote.point;
    });
  }

}
