import { Routes } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';
import { CreateTournamentComponent } from './create-tournament/create-tournament.component';

export const routes: Routes = [
  { path: 'test', component: TestComponentComponent },
  { path: 'create', component: CreateTournamentComponent },
];
console.log('Registered Routes:', routes);
