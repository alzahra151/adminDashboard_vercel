import { Component, OnInit } from '@angular/core';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  counts: any
  constructor(private reqService: PriceOfferReqService) { }
  ngOnInit() {
    // throw new Error('Method not implemented.');
    this.reqService.reqsCount().subscribe({
      next: (counts) => {
        this.counts = counts
        console.log(this.counts)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


}
