import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { BracketService } from 'c:/GitHub/Turtlements/frontend/src/services/bracket-service.service';
import { Tournament } from '../../classes/Tournament';
import { Contestant } from '../../classes/Contestant';
import { Matchup } from '../../classes/Matchup';

@Component({
  selector: 'app-render-bracket',
  imports: [NgFor],
  templateUrl: './render-bracket.component.html',
  styleUrl: './render-bracket.component.css'
})
export class RenderBracketComponent {
  tournament: Tournament;
  private startDate: Date;
  c1 : Contestant;
  c2 : Contestant;
  c3 : Contestant;
  c4 : Contestant;
  constructor() {
    this.startDate = new Date();
    this.c1 = new Contestant("c1");
    this.c2 = new Contestant("c2");
    this.c3 = new Contestant("c3");
    this.c4 = new Contestant("c4");
    this.tournament = new Tournament("name","desc",[this.c1,this.c2,this.c3,this.c4],this.startDate);
  }

  htmlToAdd : String = '<h1>Hello</h1>';

  rounds = [
    { name: 'Round 1', participants: ['Alice', 'Bob', 'Charlie'] },
    { name: 'Round 2', participants: ['David', 'Eve', 'Frank'] },
    { name: 'Round 3', participants: ['Grace', 'Heidi', 'Ivan'] }
  ];

   renderBracket(parameter: any): void{
     let bracketService: BracketService = new BracketService(this.tournament);
     let structure = bracketService.createSkeletonBracket();
     for(let i = 0; i < bracketService.calculateRoundCount(); i++){
      //create ul for every round
      const ulElement = document.createElement('ul');
      ulElement.classList.add(`round-${i}`);
      for(let j = 0; j < structure[i].length; j++){
        //create li for every matchup
        const liElement = document.createElement('ul');
        liElement.textContent = `Yo`;

        liElement.appendChild(liElement);
      }

      const bracketContainer = document.getElementById('bracket-container');
      if (bracketContainer) {
            bracketContainer.appendChild(ulElement);
      }
     }
   }

}
