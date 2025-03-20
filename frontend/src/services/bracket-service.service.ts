import { Injectable } from '@angular/core';
import { Tournament } from '../classes/Tournament';
import { Contestant } from '../classes/Contestant';
import { Matchup } from '../classes/Matchup';

@Injectable({
  providedIn: 'root'
})

export class BracketService {

  private tournament: Tournament;
  private numContestants: number;
  private contestants: Contestant[];
  private matchupSpot: number;

  constructor(tournament: Tournament) {
    this.tournament = tournament;
    this.contestants = this.tournament.getContestants();
    this.numContestants = this.contestants.length;
    this.matchupSpot = 0;
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

  public calculateFirstRoundMatchupCount(): number {
    if (this.numContestants < 2) throw new Error("InsufficientContestants");
    return this.ceilPowerOf2() / 2;
  }

  public sortContestants(): void {
    if (this.contestants.length < 2) throw new Error("InsufficientContestants");
    this.contestants.sort(this.seedCompare);
  }

  private seedCompare(c1: Contestant, c2: Contestant): number {
    if (c1.getSeed() < c2.getSeed()) {
      return -1;
    } else if (c1.getSeed() > c2.getSeed()) {
      return 1;
    } else {
      return 0;
    }
  }

  public createFirstRoundMatchups(): Matchup[] {
    if (this.numContestants < 2) throw new Error("InsufficientContestants");
    let firstRoundMatchups: Matchup[] = [];
    let contestantsCopy: Contestant[] = JSON.parse(JSON.stringify(this.contestants));
    let byeCount: number = this.calculateByes();
    let firstRoundMatchupCount: number = this.calculateFirstRoundMatchupCount();
    let byeMatchups: Matchup[] = [];

    //calculate bye matchups
    for (let i = 0; i < byeCount; i++) {
      let contestant: Contestant | undefined = contestantsCopy.shift();
      let matchup: Matchup = new Matchup(1, this.matchupSpot, contestant);
      byeMatchups.push(matchup);
      this.matchupSpot++;
    }
    firstRoundMatchups.push(...byeMatchups);
    //create real first round matchups
    for (let i = 0; i < contestantsCopy.length; i += 2) {
      let contestant1: Contestant | undefined = contestantsCopy[i];
      let contestant2: Contestant | undefined = contestantsCopy[i + 1];

      let matchup: Matchup = new Matchup(1, this.matchupSpot, contestant1, contestant2);
      this.matchupSpot++;
      firstRoundMatchups.push(matchup);
    }
    return firstRoundMatchups;
  }

  public createUnsortedBracket(): void {

  }
}
