import { Component, OnInit } from '@angular/core';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';

@Component({
  selector: 'app-accepted-req',
  templateUrl: './accepted-req.component.html',
  styleUrls: ['./accepted-req.component.scss']
})
export class AcceptedReqComponent implements OnInit {
  requests: any
  constructor(private reqService: PriceOfferReqService) {

  }
  ngOnInit(): void {
    this.getAcceptedReq(6, 0)
  }
  getAcceptedReq(limit: any, page: any) {
    this.reqService.getAcceptedReq(limit, page).subscribe({
      next: (data) => {
        this.requests = data
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }
  onPageChange(event: any) {
    console.log(event)
    console.log(event.page)
    this.getAcceptedReq(event.rows, event.page)
  }
}
