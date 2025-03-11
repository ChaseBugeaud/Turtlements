import { Contestant } from "./Contestant";
import { Game } from "./Game";

export class Matchup {
  private bestOfCount: number;
  private contestant1: Contestant;
  private contestant2?: Contestant;
  private games: Game[];
  private winner?: Contestant;
  private left: Contestant;
  private right: Contestant;

  constructor(bestOfCount: number, contestant1: Contestant, contestant2?: Contestant) {
    this.contestant1 = contestant1;
    if (contestant2) {
      this.contestant2 = contestant2;
    }
    this.bestOfCount = bestOfCount;
    this.games = [];
  }

  //Getters
  public getContestant1(): Contestant {
    return this.contestant1;
  }

  public getContestant2(): Contestant {
    return this.contestant2!;
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

  //Other functions
}
