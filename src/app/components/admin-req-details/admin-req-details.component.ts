import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';

@Component({
  selector: 'app-admin-req-details',
  templateUrl: './admin-req-details.component.html',
  styleUrls: ['./admin-req-details.component.scss']
})
export class AdminReqDetailsComponent {

  reqID: any
  Request: any
  constructor(private route: ActivatedRoute, private OfferService: PriceOfferReqService, private router: Router) {

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

  }
  getReqByID() {
    this.OfferService.getReqByID(this.reqID).subscribe({

      next: (data) => {
        this.Request = data
        // console.log(this.Request)
        this.changOfferStatus()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  ApproveReq() {
    this.OfferService.approveReq(this.Request._id).subscribe({
      next: (data) => {

        // console.log(data)
        this.router.navigate(['/home/NewRequestes'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  // ApproveToRepresent() {
  //   this.OfferService.updateReq(this.Request._id, { Rejected: false, ApproveToReprsentative: true }).subscribe({
  //     next: (data) => {

  //       // console.log(data)
  //       this.router.navigate(['/home/NewRequestes'])
  //     },
  //     error: (err) => {
  //       console.log(err)
  //     }
  //   })
  // }
  // ApproveToAll() {
  //   this.OfferService.updateReq(this.Request._id, { Rejected: false, ApproveToSalesManger: true, ApproveToReprsentative: true }).subscribe({
  //     next: (data) => {

  //       // console.log(data)
  //       this.router.navigate(['/home/NewRequestes'])
  //     },
  //     error: (err) => {
  //       console.log(err)
  //     }
  //   })
  // }
  rejectReq() {
    this.OfferService.updateReq(this.Request._id, { Rejected: true, Approve: false }).subscribe({
      next: (data) => {

        // console.log(data)
        this.router.navigate(['/home/NewRequestes'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  changOfferStatus() {
    this.OfferService.updateReq(this.Request._id, { IsOpen: true }).subscribe({
      next: (data) => {

        // console.log(data)
        // this.router.navigate(['/home'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}

