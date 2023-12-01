import { Component } from '@angular/core';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';

@Component({
  selector: 'app-commented-reqs',
  templateUrl: './commented-reqs.component.html',
  styleUrls: ['./commented-reqs.component.scss']
})
export class CommentedReqsComponent {
  requests: any
  constructor(private reqService: PriceOfferReqService) {

  }
  ngOnInit(): void {
    this.getCommentedReqs()
  }
  getCommentedReqs() {
    this.reqService.getCommentedReqs().subscribe({
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
