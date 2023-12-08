import { Component, OnInit } from '@angular/core';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';
import { io } from 'socket.io-client'
@Component({
  selector: 'app-sid-bar',
  templateUrl: './sid-bar.component.html',
  styleUrls: ['./sid-bar.component.scss']
})
export class SidBarComponent implements OnInit {
  ReqCount: any
  newReqs: any
  socket = io('https://varrox-system-apii.onrender.com');
  constructor(private ReqService: PriceOfferReqService) {
    // Listen for changes on the user change stream
    this.socket.on('ReqChange', (change) => {
      console.log('User change:', change);
      this.ReqsCount()

    });
  }


  ngOnInit(): void {
    this.ReqsCount()

  }
  ReqsCount() {
    this.ReqService.getNewReqCount().subscribe({
      next: (data) => {
        this.ReqCount = data
        console.log(this.ReqCount)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
