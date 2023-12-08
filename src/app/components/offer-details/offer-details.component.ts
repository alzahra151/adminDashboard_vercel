import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss'],
  providers: [MessageService]
})
export class OfferDetailsComponent implements OnInit, OnDestroy {
  reqID: any
  Request: any
  pdfUrl: any;
  constructor(private route: ActivatedRoute, private OfferService: PriceOfferReqService,
    private router: Router, private spinner: NgxSpinnerService
    , private messageService: MessageService) {

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
    if (this.Request.Approve) {
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

          // link.download = `02-${this.Request.QrCode}.pdf`;
          link.download = `02-${this.Request.QrCode}.pdf`;

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
    } else {
      this.preventDownloadMessage()
    }
  }
  ngOnDestroy() {
    this.spinner.hide()
  }
  preventDownloadMessage() {
    this.messageService.add({
      severity: "warn",

      detail: "you can't download this file",
    });
  }
}
