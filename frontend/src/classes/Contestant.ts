export class Contestant {
  private name: string;
  private seed?: number;

  constructor(name: string, seed?: number) {
    this.name = name;
    if (seed) {
      this.seed = seed;
    }
  }

  //Getters
  public getName(): string {
    return this.name;
  }
  public getSeed(): number {
    return this.seed!;
  }

  //Setters
  public setName(name: string): void {
    this.name = name;
  }

  public setSeed(seed: number): void {
    this.seed = seed;
  }
  //TODO: maybe isActive()

}
