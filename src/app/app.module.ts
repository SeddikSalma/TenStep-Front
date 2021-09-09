import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app.routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { FormationComponent } from './components/formation/formation.component';
import { FormateurComponent } from './components/formateur/formateur.component';
import { ResDetailsComponent } from './components/res-details/res-details.component';
import { ParticipantComponent } from './components/participant/participant.component';
import { DevisComponent } from './components/devis/devis.component';
import { FactureComponent } from './components/facture/facture.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ReservationComponent,
    FormationComponent,
    FormateurComponent,
    ResDetailsComponent,
    ParticipantComponent,
    DevisComponent,
    FactureComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    PDFExportModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
