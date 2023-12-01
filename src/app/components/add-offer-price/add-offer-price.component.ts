import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';
@Component({
  selector: 'app-add-offer-price',
  templateUrl: './add-offer-price.component.html',
  styleUrls: ['./add-offer-price.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AddOfferPriceComponent implements OnInit {
  reqID: string = ''
  req: any
  PriceOfferForm: FormGroup
  newPriceOffer: any
  constructor(private route: ActivatedRoute, private reqService: PriceOfferReqService, private fb: FormBuilder, private primengConfig: PrimeNGConfig,
    private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router) {
    this.PriceOfferForm = this.fb.group({
      PriceOfferReq: ['', [Validators.required]],
      PriceOffer: fb.array([]),
      TotalPrice: ['', [Validators.required]],
      Comment: ['', [Validators.required]]
    })
  }
  newDevicePrice(): FormGroup { // form array for services
    return this.fb.group({
      Device: ['', [Validators.required]],
      DevicePricrOffer: ['', [Validators.required]],
    })
  }
  newServicePrice(): FormGroup { // form array for services
    return this.fb.group({
      Service: ['', [Validators.required]],
      ServicePriceOffer: ['', [Validators.required]],
      // PriceOffer: this.fb.array([this.newServicePrice()]),
      DeviceOffer: this.fb.array([this.newDevicePrice()]),
    })
  }
  get PriceOffer() {
    return this.PriceOfferForm.get('PriceOffer') as FormArray;
  }


  DeviceOffer(index: any): FormArray {

    return this.PriceOffer.at(index).get(`DeviceOffer`) as FormArray;
  }
  addNewServicePrice(req: any) { //to push inputs for services to add price offer for individual service
    // this.PriceOffer.clear()
    let index: number
    // this.SelectedReq = req
    console.log(req)
    this.req?.Services?.forEach(async (obj: any) => {
      console.log(obj)
      const newItemIndex = this.PriceOffer.length;
      console.log(newItemIndex)
      await this.PriceOffer.push(this.fb.group({
        Service: [obj.Service?._id],
        ServicePriceOffer: [],
        // PriceOffer: this.fb.array([this.newServicePrice()]),
        DeviceOffer: this.fb.array([]),
      })
      )

      obj?.Devices?.forEach(async (obj2: any) => {

        await this.DeviceOffer(newItemIndex).push(this.fb.group({
          Device: [obj2],
          DevicePricrOffer: [],
        }))
      })
    });
  }
  addPriceOffer() { //add price offer 

    this.reqService.addPriceoffer(this.PriceOfferForm.value ).subscribe({
      next: (data) => {
        this.newPriceOffer = data
        this.showSuccessMessage()
        this.PriceOfferForm.reset()
        this.updateReqAfterSend()
        this.router.navigate(['/home'])
      },
      error: (err) => {
        console.log(err)
        // this.showErrorMessage()
      }
    })
  }
  updateReqAfterSend() {
    this.reqService.updateReq(this.req._id, { HavePriceOffer: true }).subscribe({
      next: (data) => {
        console.log("success")
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  ngOnInit() {
    this.route.params
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.reqID = params['id'];
        console.log(this.reqID)
      }
      );
    this.getReqByID()

    this.primengConfig.ripple = true;
  }

  getReqByID() {
    this.reqService.getReqByID(this.reqID).subscribe({

      next: (data) => {
        this.req = data
        console.log(this.req)
        this.PriceOfferForm.controls['PriceOfferReq'].patchValue(this.req._id);
        this.addNewServicePrice(this.req)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  showSuccessMessage() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'تم ارسال الطلب بنجاح.' });
  }
  showErrorMessage() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'خطأ أثناء اضافة عرض السعر.' });
  }
}
