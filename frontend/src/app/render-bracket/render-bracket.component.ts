import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { BracketService } from '../../services/bracket-service.service';
import { Tournament } from '../../classes/Tournament';
import { Contestant } from '../../classes/Contestant';
import { Matchup } from '../../classes/Matchup';

@Component({
  selector: 'app-render-bracket',
  imports: [NgFor],
  templateUrl: './render-bracket.component.html',
  styleUrl: './render-bracket.component.css'
})
export class RenderBracketComponent implements OnInit {
  tournament: Tournament;
  private startDate: Date;
  c1: Contestant;
  c2: Contestant;
  c3: Contestant;
  c4: Contestant;
  c5: Contestant;


  rounds: any[] = [];

  constructor() {
    this.startDate = new Date();
    this.c1 = new Contestant("Alice");
    this.c2 = new Contestant("Bob");
    this.c3 = new Contestant("Chase");
    this.c4 = new Contestant("Danielle");
    this.c5 = new Contestant("Eric");

    this.tournament = new Tournament("name", "desc", [this.c1, this.c2, this.c3, this.c4, this.c5], this.startDate);
  }

  ngOnInit(): void {
    // Call renderBracket when the component is initialized
    this.renderBracket();
  }

  renderBracket(): void {
    let bracketService: BracketService = new BracketService(this.tournament);
    let structure: Matchup[][] = bracketService.createSkeletonBracket();

    for (let i = 0; i < bracketService.calculateRoundCount(); i++) {
      console.log("round: ", i)
      console.log(structure[i]);
      let matchups: Matchup[] = structure[i];
      let contestants: String[] = [];
      for (let x = 0; x < matchups.length; x++) {
        console.log(matchups[x].getContestant1());
        console.log(matchups[x].getContestant2());
        console.log(this.c1);
        if(i == bracketService.calculateRoundCount() - 1){
          contestants.push("WINNER TBD");
        } else if (matchups[x].isBye()) {
          if (matchups[x].getContestant1()) {
            contestants.push(matchups[x].getContestant1()!.getName());
            contestants.push("BYE ROUND");
          }
        } else if (!matchups[x].isBye()) {
          if (matchups[x].getContestant1()) {
            console.log( "we here" )   
            contestants.push(matchups[x].getContestant1()!.getName());
            console.log( "we got past here" )   

          } else  {
            contestants.push("TBD");
          }
          if (matchups[x].getContestant2()) {
            contestants.push(matchups[x].getContestant2()!.getName());
          } else if (!matchups[x].getContestant2()) {
            contestants.push("TBD");
          }
        }
      }
      this.rounds.push({
        name: `Round ${i + 1}`,
        matchups: contestants
      });
      console.log(contestants);
    }
}

}
