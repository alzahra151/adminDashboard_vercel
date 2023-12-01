import { Component } from '@angular/core';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';

@Component({
  selector: 'app-rejected-req',
  templateUrl: './rejected-req.component.html',
  styleUrls: ['./rejected-req.component.scss']
})
export class RejectedReqComponent {
  requests: any
  constructor(private reqService: PriceOfferReqService) {

  }
  ngOnInit(): void {
    this.getRejectedReq()
  }
  getRejectedReq() {
    this.reqService.getRejectedReq().subscribe({
      next: (data) => {
        this.requests = data
        console.log(this.requests)
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }
}
