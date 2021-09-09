
import {ParticipantService} from './../../services/participant.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Participant } from 'src/app/models/participant';
import { HttpErrorResponse } from '@angular/common/http';import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {
  editParticipant:Participant;
  deleteParticipant:Participant;
  ParticipantForm= new FormGroup({
    nom: new FormControl(),
    nbr: new FormControl(),
    
  });
  ParticipantFormedit= new FormGroup({
    nom: new FormControl(),
    nbr: new FormControl(),
    
  });
  Participants:Participant[];  
  selectedParticipant: Participant= {
    id: null,
    nom: null,
    nbr: null
  };
  constructor(private service:ParticipantService) { }  
  ngOnInit() {this.service.readParticipants().subscribe((Participants: Participant[])=>{
    this.Participants = Participants;
   
  })
  }
  onAddParticipant(){
    this.service.addParticipant(this.ParticipantForm.value).subscribe(
      (response: Participant) => {
        console.log(response);
        this.ngOnInit();
        this.ParticipantForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(this.ParticipantForm.value);
      }
    );
  }
  public onDeleteParticipant(id:number){
    this.service.deleteParticipant(id).subscribe(
      (response: Participant) => {
        console.log(response);
        
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
      }
    );
  }

  public onUpdateParticipant(id:number){
    console.log(id);
   this.service.updateParticipant(id, this.ParticipantFormedit.value).subscribe(
     (response: Participant) => {
       console.log(response);
       this.ngOnInit();
     },
     (error: HttpErrorResponse) => {
       //alert(error.message);
     }
     );
   }
   public onOpenModal(Participant: Participant, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      
      this.editParticipant = Participant;
      button.setAttribute('data-bs-target', '#updateParticipantModal');
      console.log(button);
    }
    if (mode === 'delete') {
      this.deleteParticipant = Participant;
      button.setAttribute('data-bs-target', '#deleteParticipantModal');
    }
    container.appendChild(button);
    button.click();
  }
}
