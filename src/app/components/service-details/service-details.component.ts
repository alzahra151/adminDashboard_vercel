import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
  service: any
  serviceId: any
  constructor(private route: ActivatedRoute, private reqService: PriceOfferReqService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.serviceId = params['id']
      console.log(this.serviceId)
    })
    this.getService()
  }
  getService() {
    this.reqService.getServicebyId(this.serviceId).subscribe({
      next: (data) => {
        this.service = data
        console.log(this.service)
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }
}
