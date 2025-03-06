import { Contestant } from "./Contestant";
import { Matchup } from "./Matchup";
export class Tournament {
  private name: string;
  private description: string;
  private contestants: Contestant[];
  private startDate: Date;
  private endDate?: Date;
  private matchups: Matchup[];
  private prize?: string | number;

  constructor(
    name: string,
    description: string,
    contestants: Contestant[],
    startDate: Date,
    endDate?: Date,
    prize?: string | number
  ) {
    this.name = name;
    this.description = description;
    this.contestants = contestants;
    this.startDate = startDate;
    if (endDate) {
      this.endDate = endDate;
    }
    if (prize) {
      this.prize = prize;
    }
    this.matchups = []; //TODO: create matchup bracket
  }

  //Getters
  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getContestants(): Contestant[] {
    return this.contestants;
  }

  public getStartDate(): Date {
    return this.startDate;
  }

  public getEndDate(): Date {
    return this.endDate!;
  }

  public getMatchups(): Matchup[] {
    return this.matchups;
  }

  public getPrize(): string | number {
    return this.prize!;
  }

  //Setters
  public setName(name: string): void {
    this.name = name;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public setContestants(contestants: Contestant[]): void {
    this.contestants = contestants;
  }

  public setStartDate(startDate: Date): void {
    this.startDate = startDate;
  }

  public setEndDate(endDate: Date): void {
    this.endDate = endDate;
  }

  public setMatchups(matchups: Matchup[]): void {
    this.matchups = matchups;
  }

  public setPrize(prize: string | number | undefined): void {
    this.prize = prize;
  }

  //Other functions
}

