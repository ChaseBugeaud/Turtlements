import { Contestant } from "./Contestant";
import { Game } from "./Game";

export class Matchup {
  private bestOfCount: number;
  private contestant1?: Contestant;
  private contestant2?: Contestant;
  private games: Game[];
  private bye: boolean;
  private parent?: Matchup;
  private spot?: number;
  private winner?: Contestant;

  constructor(bestOfCount: number, spot?: number, contestant1?: Contestant, contestant2?: Contestant) {
    if (contestant1) {
      this.contestant1 = contestant1;
    }
    if (contestant2) {
      this.contestant2 = contestant2;
    }
    //determine if it is a bye or not
    if ((contestant1 && !contestant2) || (!contestant1 && contestant2)) {
      this.bye = true;
    } else {
      this.bye = false;
    }
    this.bestOfCount = bestOfCount;
    this.games = [];
    if (spot) {
      this.spot = spot;
    }
  }

  //Getters
  public getContestant1(): Contestant | undefined {
    return this.contestant1;
  }

  public getContestant2(): Contestant {
    return this.contestant2!;
  }

  public getContestantCount(): number {
    let count: number = 0;
    if (this.contestant1) count++;
    if (this.contestant2) count++;
    return count;
  }

  public getBestOfCount(): number {
    return this.bestOfCount;
  }

  public getGames(): Game[] {
    return this.games;
  }

  public getWinner(): Contestant {
    if (!this.contestant2) {
      this.winner = this.contestant1;
    }
    return this.winner!;
  }

  public getSpot(): number | undefined {
    return this.spot;
  }

  public getParent(): Matchup | undefined {
    return this.parent;
  }

  public isBye(): boolean {
    return this.bye;
  }

  //Setters
  public setContestant1(contestant1: Contestant): void {
    this.contestant1 = contestant1;
  }

  public setContestant2(contestant2: Contestant): void {
    this.contestant2 = contestant2;
  }

  public setBestOfCount(bestOfCount: number): void {
    this.bestOfCount = bestOfCount;
  }

  public addGame(game: Game): void {
    //See if any contestant has won more than half the games, set winner accordingly
    let c1Wins: number = 0;
    let c2Wins: number = 0;
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].getWinner() === this.contestant1) {
        c1Wins++;
      } else if (this.games[i].getWinner() === this.contestant2) {
        c2Wins++;
      }
    }
    if (c1Wins >= this.bestOfCount) {
      this.winner = this.contestant1;
    } else if (c2Wins >= this.bestOfCount) {
      this.winner = this.contestant2;
    }
    this.games.push(game);
  }

  public removeGame(index: number): Game[] | null {
    if (this.games.length < index) {
      console.error("index: ", index, "exceeds max game index: ", this.games.length);
      return null;
    } else {
      //unset winner when removing a game
      if (this.winner) {
        this.winner = undefined;
      }
      return this.games.splice(index, 1);
    }
  }

  public setWinner(winner: Contestant): void {
    this.winner = winner;
  }

  public setSpot(spot: number): void {
    this.spot = spot;
  }

  public setParent(parent: Matchup): void {
    this.parent = parent;
  }

}
