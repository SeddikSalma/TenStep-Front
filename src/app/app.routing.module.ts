import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/containers/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { RandomGuard } from './auth/guards/random.guard';
import { FormateurComponent } from './components/formateur/formateur.component';
import { FormationComponent } from './components/formation/formation.component';
import { HeaderComponent } from './components/header/header.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ParticipantComponent } from './components/participant/participant.component';
import { DevisComponent } from './components/devis/devis.component';
import { FactureComponent } from './components/facture/facture.component';
import { ResDetailsComponent } from './components/res-details/res-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'secret-random-number',
    loadChildren: './random/random.module#RandomModule',
    canActivate: [RandomGuard],
    canLoad: [RandomGuard]
  },
  { path: 'formateur', component: FormateurComponent , canActivate: [RandomGuard],
  canLoad: [RandomGuard]},
  { path: 'formation', component: FormationComponent , canActivate: [RandomGuard],
  canLoad: [RandomGuard]},
  { path: 'reservation', component: ReservationComponent , canActivate: [RandomGuard],
  canLoad: [RandomGuard]},
  { path: 'header', component: HeaderComponent },
  { path: 'participant', component: ParticipantComponent , canActivate: [RandomGuard],
  canLoad: [RandomGuard]},
  { path: 'devis', component: DevisComponent , canActivate: [RandomGuard],
  canLoad: [RandomGuard]},
  { path: 'facture', component: FactureComponent, canActivate: [RandomGuard],
  canLoad: [RandomGuard] },
  { path: 'resDetail', component: ResDetailsComponent , canActivate: [RandomGuard],
  canLoad: [RandomGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
