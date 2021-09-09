import { Component, OnInit } from '@angular/core';
import {FormateurServiceService} from './../../services/formateur-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Formateur } from 'src/app/models/formateur';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.css']
})
export class FormateurComponent implements OnInit {
  editFormateur:Formateur;
  deleteFormateur:Formateur;
  formateurForm= new FormGroup({
    nom: new FormControl(),
    type: new FormControl(),
    
  });
  formateurFormedit= new FormGroup({
    nom: new FormControl(),
    type: new FormControl(),
    
  });
  formateurs:Formateur[];  
  selectedFormateur: Formateur= {
    id: null,
    nom: null,
    type: null
  };
  constructor(private service:FormateurServiceService) { }

  ngOnInit() {
    this.service.readFormateurs().subscribe((formateurs: Formateur[])=>{
      this.formateurs = formateurs;
     
    })
  }
  onAddFormateur(){
    this.service.addFormateur(this.formateurForm.value).subscribe(
      (response: Formateur) => {
        console.log(response);
        this.ngOnInit();
        this.formateurForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(this.formateurForm.value);
      }
    );
  }
  public onDeleteFormateur(id:number){
    this.service.deleteFormateur(id).subscribe(
      (response: Formateur) => {
        console.log(response);
        
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
      }
    );
  }

 public onUpdateFormateur(id:number){
   console.log(id);
  this.service.updateFormateur(id, this.formateurFormedit.value).subscribe(
    (response: Formateur) => {
      console.log(response);
      this.ngOnInit();
    },
    (error: HttpErrorResponse) => {
      //alert(error.message);
    }
    );
  }

  public onOpenModal(formateur: Formateur, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      
      this.editFormateur = formateur;
      button.setAttribute('data-bs-target', '#updateFormateurModal');
      console.log(button);
    }
    if (mode === 'delete') {
      this.deleteFormateur = formateur;
      button.setAttribute('data-bs-target', '#deleteFormateurModal');
    }
    container.appendChild(button);
    button.click();
  }
}

