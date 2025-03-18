import { Component } from '@angular/core';
import { Contestant } from '../../classes/Contestant';
import { Tournament } from '../../classes/Tournament';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tournament',
  imports: [NgFor],
  templateUrl: './tournament.component.html',
  styleUrl: './tournament.component.css'
})
export class TournamentComponent {
  tournament: Tournament;
  private startDate: Date;

  constructor() {
    this.startDate = new Date();
    this.tournament = new Tournament("asdf", "description", [], this.startDate);
  }
  addContestantToTournament(name: string): void {
    let contestant: Contestant = new Contestant(name);
    this.tournament.addContestant(contestant);
  }
}
