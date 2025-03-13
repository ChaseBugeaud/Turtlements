import { Injectable } from '@angular/core';
import { Matchup } from '../classes/Matchup';
import { Tournament } from '../classes/Tournament';
import { Contestant } from '../classes/Contestant';


@Injectable({
  providedIn: 'root'
})

export class BracketService {

  private tournament: Tournament;
  private numContestants: number;

  constructor(tournament: Tournament) {
    this.tournament = tournament;
    this.numContestants = this.tournament.getContestants().length;
  }

  private nextPowerOf2(): number {
    //next power of 2 is Math.ceil(log2(numContestants))
    return Math.pow(2, Math.ceil(Math.log2(this.numContestants)));
  }
  public calculateByes(): number {

    if (this.nextPowerOf2() === this.numContestants) {
      return 0;
    } else {
      return this.nextPowerOf2() - this.numContestants;
    }

    return this.nextPowerOf2();
  }

  public calculateMatchupCount(): number {
    return this.nextPowerOf2() - 1;
  }
}
