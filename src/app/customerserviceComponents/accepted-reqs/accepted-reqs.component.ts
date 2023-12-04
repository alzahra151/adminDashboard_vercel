import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';
import { ReqCardComponent } from 'src/app/shared/commponents/req-card/req-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accepted-reqs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  // declarations: [ReqCardComponent],
  templateUrl: './accepted-reqs.component.html',
  styleUrls: ['./accepted-reqs.component.scss']
})
export class AcceptedReqsComponent {
  requests: any
  constructor(private reqService: PriceOfferReqService) {

  }
  ngOnInit(): void {
    this.getAcceptedReq()
  }
  getAcceptedReq() {
    this.reqService.getAcceptedReq().subscribe({
      next: (data) => {
        this.requests = data
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }
}
