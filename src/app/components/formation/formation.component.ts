import { Component, OnInit } from '@angular/core';
import {FormationServiceService} from './../../services/formation-service.service';
import { Formation } from 'src/app/models/formation';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  editFormation:Formation;
  deleteFormation:Formation;

  formationForm= new FormGroup({
    nom: new FormControl(),
    nbr_jours: new FormControl(),
    prix: new FormControl(),
  });
  formationFormedit= new FormGroup({
    nom: new FormControl(),
    nbr_jours: new FormControl(),
    prix: new FormControl(),
  });

  formations:Formation[];  
selectedFormation: Formation= {
  id: null,
  nom: null,
  nbr_jours: null,
  prix: null
};

  constructor(private service:FormationServiceService) { }

  ngOnInit() {
    this.service.readFormations().subscribe((formations: Formation[])=>{
      this.formations = formations;
     
    })
    
  }
  onAddFormation(){
    this.service.addFormation(this.formationForm.value).subscribe(
      (response: Formation) => {
        console.log(response);
        this.ngOnInit();
        this.formationForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(this.formationForm.value);
      }
    );
  }
  public onOpenModal(formation: Formation, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      this.editFormation = formation;
      button.setAttribute('data-bs-target', '#updateFormationModal');
    }
    if (mode === 'delete') {
      this.deleteFormation = formation;
      button.setAttribute('data-bs-target', '#deleteFormationModal');
    }

    
    container.appendChild(button);
    button.click();
  }
  public onDeleteFormation(id:number){
    this.service.deleteFormation(id).subscribe(
      (response: Formation) => {
        console.log(response);
        
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
      }
    );
  }

 public onUpdateFormation(id:number){
   console.log(id);
  this.service.updateFormation(id, this.formationFormedit.value).subscribe(
    (response: Formation) => {
      console.log(response);
      this.ngOnInit();
    },
    (error: HttpErrorResponse) => {
      //alert(error.message);
    }
    );
  }

  /*createOrUpdateFormation(form){
    if(this.selectedFormation && this.selectedFormation.id){
      form.value.id = this.selectedFormation.id;
      this.service.updateFormation(form.value).subscribe((Formation: Formation)=>{
        console.log("Formation updated" , Formation);
      });
    }
    else{

      this.service.createFormation(form.value).subscribe((Formation: Formation)=>{
        console.log("Formation created, ", Formation);
      });
    }

  }

  selectFormation(Formation: Formation){
    this.selectedFormation = Formation;
  }*/
}
