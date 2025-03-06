import { Contestant } from "./Contestant";

export class Game {
  private winner: Contestant;
  private contestant1: Contestant;
  private contestant2?: Contestant;

  constructor(winner: Contestant, contestant1: Contestant, contestant2?: Contestant) {
    this.winner = winner;
    this.contestant1 = contestant1;
    if (contestant2) {
      this.contestant2 = contestant2;
    }
  }

  //Getters
  public getWinner(): Contestant {
    return this.winner;
  }

  public getContestant1(): Contestant {
    return this.contestant1;
  }

  public getContestant2(): Contestant {
    return this.contestant2!;
  }

  //Setters
  public setWinner(winner: Contestant): void {
    this.winner = winner;
  }

  public setContestant1(contestant1: Contestant): void {
    this.contestant1 = contestant1;
  }

  public setContestant2(contestant2: Contestant): void {
    this.contestant2 = contestant2;
  }

  //Other functions
}
