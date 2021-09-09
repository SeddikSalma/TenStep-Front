import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  @ViewChild('htmlData') htmlData!:ElementRef;
  reservation:number;
  public Res:Reservation;
  constructor(private route:ActivatedRoute,private service:ReservationService) { }

  ngOnInit() {
    this.route.queryParams.pipe(
      filter(params => params.DF))
      .subscribe(params => {
        console.log(params); 
  
        this.reservation = params.DF;
        console.log(this.reservation);
        this.service.getres(this.reservation).subscribe((Response:Reservation)=>{
          console.log(Response);
          this.Res=Response;
        });
      }
      );
     
  }
  public downloadPDF():void {
    let data = this.htmlData.nativeElement;
    let options : any = {
      orientation: 'p',
      unit: 'px',
      format: 'a4',
      };
    let doc = new jsPDF(options);
     doc.html(data.innerHTML, {
      callback: function (doc) {
            doc.save("angular-demo.pdf");
          },
      margin:15,
      x: 10,
      y: 10
    });
  }

}
