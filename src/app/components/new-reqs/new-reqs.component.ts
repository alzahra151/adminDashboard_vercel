import { Component, OnInit } from '@angular/core';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';
import { io } from 'socket.io-client'
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-new-reqs',
  templateUrl: './new-reqs.component.html',
  styleUrls: ['./new-reqs.component.scss']
})
export class NewReqsComponent implements OnInit {
  newReqs: any
  socket = io('https://varrox-system-apii.onrender.com');
  constructor(private ReqService: PriceOfferReqService, private primengConfig: PrimeNGConfig) {
    // Listen for changes on the user change stream
    this.socket.on('ReqChange', (change) => {
      console.log('User change:', change);
      this.getNewReq()
    });
  }
  ngOnInit(): void {
    this.getNewReq()
    this.primengConfig.ripple = true;
  }
  getNewReq() {
    this.ReqService.getNewReqs().subscribe({
      next: (data) => {
        this.newReqs = data
        console.log(this.newReqs)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
