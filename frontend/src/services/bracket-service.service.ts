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

  constructor(tournament: Tournament) {
    this.tournament = tournament;
    this.contestants = this.tournament.getContestants();
    this.numContestants = this.contestants.length;
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

  public sortContestants(): void {
    if (this.contestants.length < 1) throw new Error("InsufficientContestants");
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

  public createUnsortedBracket(): void {
    //TODO: fix
    if (this.numContestants < 2) {
      throw new Error("InsufficientContestants");
    }
    let firstRound: Matchup[] = [];
    let contestantsCopy: Contestant[] = JSON.parse(JSON.stringify(this.contestants));
    let bracketSpot: number = 0;
    let bracket: Matchup[][] = [];
    //create byes
    for (let i = 0; i < this.calculateByes(); i++, bracketSpot++) {
      let c1: Contestant | undefined = contestantsCopy.shift();
      let m: Matchup = new Matchup(1, bracketSpot, c1);
      firstRound.push(m)
    }
    //calculate first round with instantiated contestants
    for (let i = 0; contestantsCopy.length; i += 2, bracketSpot++) {
      let c1: Contestant | undefined = contestantsCopy.shift();
      let c2: Contestant | undefined = contestantsCopy.shift();

      let m: Matchup = new Matchup(1, bracketSpot, c1, c2);
      firstRound.push(m);
    }
    bracket.push(firstRound);
    //create shell for bracket - empty matchups with no contestants
    while (bracket.length < (this.ceilPowerOf2() / 2)) {
      let previousRound = bracket[bracket.length - 1];
      let matchupCount: number = Math.ceil(previousRound.length / 2);
      let currentRound: Matchup[] = [];
      for (let j = 0; j < matchupCount; j++, bracketSpot++) {
        let m: Matchup = new Matchup(1, bracketSpot);
        currentRound.push(m);
      }
      bracket.push(currentRound);
    }
    //console.log("bracket\n", bracket)
    this.tournament.setBracket(bracket);
  }
}
