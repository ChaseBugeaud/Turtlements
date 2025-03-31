import { Component } from '@angular/core';
import { Contestant } from '../../classes/Contestant';
import { Tournament } from '../../classes/Tournament';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tournament',
  imports: [NgFor, FormsModule],
  templateUrl: './tournament.component.html',
  styleUrl: './tournament.component.css'
})
export class TournamentComponent {
  tournament: Tournament;
  private startDate: Date;

  constructor() {
    this.startDate = new Date();
    this.tournament = new Tournament("asdf", "description", [], this.startDate);
  }
  addContestantToTournament(name: string): void {
    //checks for required field
    if(this.isFilledOut(name)){
      let contestant: Contestant = new Contestant(name);
      this.tournament.addContestant(contestant);
    }else{
      console.log("missing fields");
    }
  }

  isFilledOut(parameter: any): boolean{
    //checks if field is empty
    return parameter != null && parameter != '';
  }

  addDetailsToTournament(title: string, desc: string, prize: string, start: Date, end: Date): void {
    //checks for required fields and mininum of 2 contestants
    if(this.isFilledOut(title) && this.isFilledOut(desc) && this.isFilledOut(start) && this.tournament.getContestants().length >= 2) {
      this.tournament.setName(title);
      this.tournament.setDescription(desc);
      this.tournament.setPrize(prize);
      this.tournament.setStartDate(start);
      this.tournament.setEndDate(end);

      console.log(this.tournament);
    }else{
      //else error message is displayed
      console.log("missing fields");
    }
  }

  stringToDate(dateString: string): Date {
    return new Date(dateString);
  }
}
