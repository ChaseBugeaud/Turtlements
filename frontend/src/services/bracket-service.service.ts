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

  private ceilPowerOf2(): number {
    //next power of 2 is Math.ceil(log2(numContestants))
    return Math.pow(2, Math.ceil(Math.log2(this.numContestants)));
  }

  public calculateByes(): number {
    if (this.numContestants < 2) throw new Error("InsufficientContestants");
    if (this.ceilPowerOf2() === this.numContestants) {
      return 0;
    } else {
      return this.ceilPowerOf2() - this.numContestants;
    }
  }

  public calculateMatchupCount(): number {
    if (this.numContestants < 2) throw new Error("InsufficientContestants");
    return this.ceilPowerOf2() - 1;
  }
}
