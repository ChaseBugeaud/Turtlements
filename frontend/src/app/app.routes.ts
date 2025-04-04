import { Routes } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';
import { CreateTournamentComponent } from './create-tournament/create-tournament.component';
import { TournamentComponent } from './tournament/tournament.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'test', component: TestComponentComponent },
  { path: 'create', component: CreateTournamentComponent },
  { path: 'tournament', component: TournamentComponent },
  { path: 'login', component: LoginComponent}

];
console.log('Registered Routes:', routes);
