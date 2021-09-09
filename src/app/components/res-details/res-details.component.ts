import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Formation } from 'src/app/models/formation';
import { Participant } from 'src/app/models/participant';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-res-details',
  templateUrl: './res-details.component.html',
  styleUrls: ['./res-details.component.css']
})
export class ResDetailsComponent implements OnInit {
reservation:number;
public Res:Reservation;
  constructor(private route:ActivatedRoute,private service:ReservationService,private router: Router) { }

  ngOnInit() {
    this.route.queryParams.pipe(
      filter(params => params.reservation))
      .subscribe(params => {
        console.log(params); 
  
        this.reservation = params.reservation;
        console.log(this.reservation);
      }
      );
      
      this.service.getres(this.reservation).subscribe((Response:Reservation)=>{
        console.log(Response);
        this.Res=Response;
      });
  }
  goToPage(pageName:string,id:number):void
  {
    this.router.navigate([`${pageName}`],{queryParams:{DF:`${id}`}});
  }

}
