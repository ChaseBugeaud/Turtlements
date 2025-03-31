import { Routes } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';
import { CreateTournamentComponent } from './create-tournament/create-tournament.component';
import { TournamentComponent } from './tournament/tournament.component';

export const routes: Routes = [
  { path: 'test', component: TestComponentComponent },
  { path: 'create', component: CreateTournamentComponent },
  { path: 'tournament', component: TournamentComponent },

];
console.log('Registered Routes:', routes);
