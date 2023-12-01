import { Component, Input } from '@angular/core';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-req-card',
  templateUrl: './req-card.component.html',
  styleUrls: ['./req-card.component.scss']
})
export class ReqCardComponent {
  @Input() reqData: any
  pdfUrl: any;
  constructor() { }

}
