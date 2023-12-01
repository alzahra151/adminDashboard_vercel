import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  serviceForm: FormGroup
  services: any
  serviceID: any
  service: any
  IsAddMode: boolean = false
  loading: boolean = true
  constructor(private reqService: PriceOfferReqService, private formBilder: FormBuilder, private route: ActivatedRoute) {
    this.serviceForm = formBilder.group({
      Name: ['', [Validators.required]],
      Details: formBilder.array([formBilder.control('')]),
      Devices: formBilder.array([this.deviceDetails()]),
      // Maintenance: formBilder.group({
      //   description: ['',],
      //   price: ['',]
      // })
    })
  }
  get Name() {
    return this.serviceForm.get("Name");
  }
  get Details() {
    return this.serviceForm.get('Details') as FormArray;
  }
  get Devices() {
    return this.serviceForm.get('Devices') as FormArray;
  }
  get Maintenance() {
    return this.serviceForm.get("Maintenance");
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.serviceID = params['id']
      this.IsAddMode = !this.serviceID
      console.log(this.IsAddMode)
      console.log(this.serviceID)
      this.getServiceById(this.serviceID)

    })
    this.getServices()
  }
  deviceDetails(): FormGroup {
    return this.formBilder.group({
      Title: ['', [Validators.required]],
      Price: [, [Validators.required]]
    })
  }
  addServiceDetail() {
    this.Details.push(this.formBilder.control(''));
  }
  addServiceDevice() {
    this.Devices.push(this.deviceDetails());
  }
  AddService() {
    if (this.IsAddMode) {
      this.reqService.addNewService(this.serviceForm.value).subscribe({
        next: (data) => {
          // this.getServices()
          console.log(data)
          this.serviceForm.reset()
        },
        error: (err) => {
          console.log(err.message)
        }
      })
    } else {
      this.reqService.editeService(this.serviceID, this.serviceForm.value).subscribe({
        next: (data) => {
          // this.getServices()
          console.log(data)
          this.serviceForm.reset()
        },
        error: (err) => {
          console.log(err.message)
        }
      })
    }

  }
  getServices() {
    this.reqService.getServices().subscribe({
      next: (data) => {
        this.services = data
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }
  getServiceById(id: any) {
    this.reqService.getServicebyId(id).subscribe({
      next: (data) => {
        this.service = data
        console.log(this.service)
        this.setFormValues()
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }
  setFormValues() {
    // const formValues: any = {};
    // // this.Devices.clear()

    for (let i = 0; i < this.service.Details.length - 1; i++) {

      this.Details.push(this.formBilder.control(''));

    }
    // for (let i = 0; i < this.service?.Devices.length - 1; i++) {
    //   this.Devices.push(this.deviceDetails());

    // }
    // //set edited item values to form value
    // for (const key in this.serviceForm.controls) {
    //   if (this.serviceForm.controls.hasOwnProperty(key) && this.service.hasOwnProperty(key)) {

    //     formValues[key] = this.service[key];

    //   }
    //   if (key == 'Devices') {

    //     formValues['Devices'] = []
    //     // console.log(this.EditedReq.PriceOffer)
    //     this.service.Devices.map(({ Title, Price }: any, index: any) => {
    //       Title;
    //       Price
    //       console.log(formValues['Devices'])
    //       formValues['Devices'][index] = { Title, Price }
    //     });
    //     console.log(formValues['Devices'])
    //     continue;
    //   }

    // }
    // console.log(formValues)
    // this.serviceForm.patchValue(formValues);
    this.service.Devices = []
    this.serviceForm.patchValue(this.service);
    // this.serviceForm.patchValue(this.service.Devices[0])
  }
}
