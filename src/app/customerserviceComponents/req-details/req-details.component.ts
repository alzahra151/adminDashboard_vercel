import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-req-details',
  standalone: true,
  imports: [CommonModule, ButtonModule, NgxSpinnerModule],
  templateUrl: './req-details.component.html',
  styleUrls: ['./req-details.component.scss']
})
export class ReqDetailsComponent {
  reqID: any
  Request: any
  pdfUrl: any;
  constructor(private route: ActivatedRoute, private OfferService: PriceOfferReqService, private router: Router, private spinner: NgxSpinnerService) {

  }
  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.reqID = params['id'];
        console.log(this.reqID)
      }
      );
    this.getReqByID()
    this.spinner.hide()

  }
  getReqByID() {
    this.OfferService.getReqByID(this.reqID).subscribe({

      next: (data) => {
        this.Request = data
        console.log(this.Request)
        // this.changOfferStatus()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  AcceptReq() {
    this.OfferService.updatePriceOffer(this.Request._id, { Approve: true }).subscribe({
      next: (data) => {

        console.log(data)
        this.router.navigate(['/home'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  changOfferStatus() {
    this.OfferService.updatePriceOffer(this.Request._id, { IsOpen: true }).subscribe({
      next: (data) => {

        console.log(data)
        // this.router.navigate(['/home'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  downloadPDf(offerData: any) {
    // console.log(offerData)
    // console.log(this.Request)
    this.spinner.show()
    this.OfferService.downloadPDF(this.Request).subscribe({

      next: (x: any) => {

        // console.log(x)
        var newBlob = new Blob([x], { type: "application/pdf" });
        const data = window.URL.createObjectURL(newBlob);
        // console.log(data)
        var link = document.createElement("a");
        link.href = data;
        this.pdfUrl = data
        link.download = `${this.Request.QrCode}.pdf`;
        link.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window
          })
        );
        setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
        this.spinner.hide()
      },
      error: (err) => {
        this.spinner.hide()
        console.log("ERR", err.message);
      },
    })

  }
}