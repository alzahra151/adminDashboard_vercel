import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';
import { ReqCardComponent } from 'src/app/shared/commponents/req-card/req-card.component';
import { RouterLink } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-accepted-reqs',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginatorModule],
  // declarations: [ReqCardComponent],
  templateUrl: './accepted-reqs.component.html',
  styleUrls: ['./accepted-reqs.component.scss']
})
export class AcceptedReqsComponent {
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
