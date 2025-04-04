import { Injectable } from '@angular/core';
import { Tournament } from '../classes/Tournament';
import { Matchup } from '../classes/Matchup';
import { Contestant } from '../classes/Contestant';
import { uuidv7 } from 'uuidv7';

@Injectable({
  providedIn: 'root'
})
export class TournamentSubmissionFormatterService {

  constructor() { }

  public formatTournament(tournament: Tournament): miniTournament {
    let returnTournament: miniTournament = {
      name: tournament.getName(),
      start_date: tournament.getStartDate(),
      end_date: tournament.getEndDate(),
      desc: tournament.getDescription(),
      prize: tournament.getPrize()
    };
    return returnTournament;
  }

  private formatContestants(tournament: Tournament, forcedUUIDs?: string[]): miniContestant[] {
    //formats all contestants with a unique UUID
    let contestantArray: Contestant[] = tournament.getContestants();
    let miniArray: miniContestant[] = [];
    if (!forcedUUIDs) {
      for (let i = 0; i < contestantArray.length; i++) {
        miniArray.push({
          id: uuidv7(),
          name: contestantArray[i].getName(),
          seed: contestantArray[i].getSeed()
        });
      }
    } else {
      for (let i = 0; i < contestantArray.length; i++) {
        miniArray.push({
          id: forcedUUIDs[i],
          name: contestantArray[i].getName(),
          seed: contestantArray[i].getSeed()
        });
      }
    }
    return miniArray;
  }

  public formatMatchups(tournament: Tournament): miniMatchup[] {
    let returnMatchups: miniMatchup[] = [];

    tournament.getBracket().forEach((matchupArr: Matchup[]) => {

      for (let i = 0; i < matchupArr.length; i++) {
        if (matchupArr[i].getContestant1() && matchupArr[i].getContestant2()) {


        }
      }
    });
    return returnMatchups;
  }

  public formatSponsor(tournament: Tournament): miniSponsor | undefined {
    let returnSponsors;
    return returnSponsors;
  }

  public formatBody(tournament: Tournament): sendObject {
    let returnObject: sendObject = {
      tournament: this.formatTournament(tournament),
      contestants: this.formatContestants(tournament),
      matchups: this.formatMatchups(tournament),
      sponsor: this.formatSponsor(tournament)
    };
    return returnObject;
  }
}

export type sendObject = {
  tournament: miniTournament,
  contestants: miniContestant[],
  matchups: miniMatchup[],
  sponsor: miniSponsor | undefined
}

export type miniMatchup = {
  c1: string,
  c2: string | undefined
}

export type miniContestant = {
  id: string,
  name: string,
  seed: number
}

export type miniTournament = {
  name: string,
  start_date: Date
  end_date: Date | undefined,
  desc: string,
  prize: string | number
}

export type miniSponsor = {
  name: string,
  description: string,
  thumbnail: string | undefined,
  header_image: string | undefined
}
