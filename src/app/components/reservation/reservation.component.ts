
import { ReservationService } from 'src/app/services/reservation.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Reservation } from 'src/app/models/reservation';
import { HttpErrorResponse } from '@angular/common/http';import { Component, OnInit } from '@angular/core';
import { Devis } from 'src/app/models/devis';
import { Formation } from 'src/app/models/formation';
import { Participant } from 'src/app/models/participant';
import { Formateur } from 'src/app/models/formateur';
import { DatePipe } from '@angular/common';
import { Facture } from 'src/app/models/facture';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [DatePipe]
})
export class ReservationComponent implements OnInit {
  public myDate:any = new Date();
  editReservation:Reservation;
  deleteReservation:Reservation;
  confirmReservation:Reservation;
  ReservationForm= new FormGroup({
    dateFin:new FormControl(),
    dateDeb:new FormControl(),  
    formation:new FormControl(),
    participant:new FormControl(),
  });
  ReservationFormFormateur= new FormGroup({
 
    formateur:new FormControl(),
    
  });
  DevisForm=new FormGroup({
    somme:new FormControl(),
    nbrParticipant:new FormControl(),
  });
  FactureForm=new FormGroup({
    somme:new FormControl(),
    nbrPaticipant:new FormControl(),
    date:new FormControl(),
  });

  ReservationFormedit= new FormGroup({ 
    dateFin:new FormControl(),
    dateDeb:new FormControl(),
    devis:new FormControl(),
    facture:new FormControl(),
    formation: new FormControl(),
    formateur:new FormControl(),
    participant:new FormControl(),
  });
  Reservations:Reservation[];  
  formations:Formation[];
 participants:Participant[];
 formateurs:Formateur[];
  constructor(private service:ReservationService,private authService: AuthService,private datePipe: DatePipe,private router: Router) { 
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.service.readReservations().subscribe((reservations: Reservation[])=>{
      this.Reservations = reservations;
   // console.log(this.Reservations);
    })
    this.service.readFormations().subscribe(( formations:Formation[])=>{
      this.formations = formations;
    
    })
    this.service.readParticipants().subscribe((participants:Participant[])=>{
      this.participants = participants; 
    })
    this.service.readFormateurs().subscribe((Formateurs:Formateur[])=>{
      this.formateurs = Formateurs; 
    })
  }


  onAddReservation(idForm:number,idPart:number){
    +this.ReservationForm.get('formation').setValue(idForm);
   +this.ReservationForm.get('participant').setValue(idPart);
 
    this.service.addReservation(this.ReservationForm.value).subscribe(
      (response: Reservation) => {
    /*    this.service.getform(idForm).subscribe((
          formation:Formation
        )=>{
          this.service.getpart(idPart).subscribe((participant:Participant)=>
          {
            
          });
        });*/

        this.DevisForm.get('somme').setValue(response.formation.prix*response.participant.nbr);
            this.DevisForm.get('nbrParticipant').setValue(response.participant.nbr);
        this.service.addReservationDevis(response.id,this.DevisForm.value).subscribe((response1: Devis)=>{
          console.log(response1);
        });
        console.log(this.ReservationForm.value);
        console.log(response);
        this.ngOnInit();
        this.ReservationForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(this.ReservationForm.value);
      }
    );
  }
  goToPage(pageName:string,id:number):void
  {
    this.router.navigate([`${pageName}`],{queryParams:{reservation:`${id}`}});
  }
  public onOpenModal(Reservation: Reservation, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      this.editReservation = Reservation;
      button.setAttribute('data-bs-target', '#updateReservationModal');
    }
    if (mode === 'delete') {
      this.deleteReservation = Reservation;
      button.setAttribute('data-bs-target', '#deleteReservationModal');
    }
    if (mode === 'confirm') {
      this.confirmReservation = Reservation;
      button.setAttribute('data-bs-target', '#confirmFormationModal');
    }

    container.appendChild(button);
    button.click();
  }
  public onDeleteReservation(id:number){
    this.service.deleteReservation(id).subscribe(
      (response: Reservation) => {
        console.log(response);
        
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
    }
    );
  }

  public onConfirmeReservation(id:number,idRes:number){
  this.ReservationFormFormateur.get('formateur').setValue(id); 
    console.log(this.ReservationFormFormateur.value);
  this.service.updateFormateur(idRes,this.ReservationFormFormateur.value).subscribe(
   (response: Reservation) => {
     this.FactureForm.get('somme').setValue(response.formation.prix*response.participant.nbr);
     this.FactureForm.get('nbrPaticipant').setValue(response.participant.nbr);
     this.FactureForm.get('date').setValue(this.myDate);
     this.service.addReservationFac(response.id,this.FactureForm.value).subscribe((response1:Facture)=>{
      console.log(response1);
      this.ngOnInit();
     })
     console.log(response);
      this.ngOnInit();
    });
  }
  
  public onUpdateReservation(id:number){
    console.log(id);
   this.service.updateReservation(id, this.ReservationFormedit.value).subscribe(
     (response: Reservation) => {
       console.log(response);
       this.ngOnInit();
     },
     (error: HttpErrorResponse) => {
       //alert(error.message);
     }
     );
   }

}
