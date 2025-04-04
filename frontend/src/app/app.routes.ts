import { Routes } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';
import { CreateTournamentComponent } from './create-tournament/create-tournament.component';
import { TournamentComponent } from './tournament/tournament.component';
import { RenderBracketComponent } from './render-bracket/render-bracket.component';

export const routes: Routes = [
  { path: 'test', component: TestComponentComponent },
  { path: 'create', component: CreateTournamentComponent },
  { path: 'tournament', component: TournamentComponent },
  { path: 'bracket', component: RenderBracketComponent },

];
