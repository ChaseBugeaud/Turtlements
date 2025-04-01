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
      //if the number of contestants are a power of 2, no byes needed
      return 0;
    } else {
      //if the number of contestants aren't a power of 2, byes are calculated
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

  public calculateRoundCount(): number {
    if (this.contestants.length < 2) throw new Error("InsufficientContestants");

    return Math.log2(this.ceilPowerOf2()) + 1;
  }

  public createFirstRoundMatchups(): Matchup[] {
    if (this.numContestants < 2) throw new Error("InsufficientContestants");
    let firstRoundMatchups: Matchup[] = [];
    let contestantsCopy: Contestant[] = JSON.parse(JSON.stringify(this.contestants));
    let byeCount: number = this.calculateByes();
    let byeMatchups: Matchup[] = [];

    //calculate bye matchups
    for (let i = 0; i < byeCount; i++) {
      let contestant: Contestant | undefined = contestantsCopy.shift();
      let matchup: Matchup = new Matchup(1, this.matchupSpot++, contestant);
      byeMatchups.push(matchup);
    }
    firstRoundMatchups.push(...byeMatchups);
    //create real first round matchups
    for (let i = 0; i < contestantsCopy.length; i += 2) {
      let contestant1: Contestant | undefined = contestantsCopy[i];
      let contestant2: Contestant | undefined = contestantsCopy[i + 1];
      let matchup: Matchup = new Matchup(1, this.matchupSpot++, contestant1, contestant2);
      firstRoundMatchups.push(matchup);
    }
    return firstRoundMatchups;
  }

  public createSkeletonBracket(): Matchup[][] {
    let returnBracket: Matchup[][] = [];
    returnBracket.push(this.createFirstRoundMatchups());
    const MAX_ROUNDS: number = this.calculateRoundCount();
    for (let round = 1; round < MAX_ROUNDS - 1; round++) {
      returnBracket[round] = [];
      for (let i = 0; i < returnBracket[round - 1].length; i += 2) {
        let newMatchup: Matchup = new Matchup(1, this.matchupSpot++);

        //account for bye rounds - they only happen on first round
        if (returnBracket[round - 1][i].isBye()) {
          newMatchup.setContestant1(returnBracket[round - 1][i].getContestant1()!);
        }
        if (returnBracket[round - 1][i + 1] && returnBracket[round - 1][i + 1].isBye()) {
          newMatchup.setContestant2(returnBracket[round - 1][i + 1].getContestant1()!);
        }
        returnBracket[round - 1][i].setParent(newMatchup);
        returnBracket[round - 1][i + 1].setParent(newMatchup);
        returnBracket[round].push(newMatchup);
      }
    }

    //create winner matchup and assign it as a parent to the last matchup
    let winner: Matchup = new Matchup(1, this.matchupSpot++);
    returnBracket[returnBracket.length - 1][0].setParent(winner);
    returnBracket.push([winner]);
    return returnBracket;
  }
}
