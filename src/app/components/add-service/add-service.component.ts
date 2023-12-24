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
  countries: any = []
  selectedCountry: any
  constructor(private reqService: PriceOfferReqService, private formBilder: FormBuilder, private route: ActivatedRoute) {
    this.serviceForm = formBilder.group({
      Name: ['', [Validators.required]],
      Details: formBilder.array([formBilder.control('')]),
      Devices: formBilder.array([this.deviceDetails()]),
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
  Price(index: any): FormArray {
    return this.Devices.at(index).get(`Price`) as FormArray;
  }
  ngOnInit() {
    this.getCounries()


    this.getServices()
  }
  deviceDetails(): FormGroup {
    return this.formBilder.group({
      Title: ['', [Validators.required]],
      Price: this.formBilder.array([])
    })
  }
  priceDetails(): FormGroup {
    return this.formBilder.group({
      country: ['', [Validators.required]],
      price: [, [Validators.required]]
    })
  }
  addServiceDetail() {
    this.Details.push(this.formBilder.control(''));
  }
  addServiceDevice() {
    this.Devices.push(this.deviceDetails());
    this.addPriceInp(this.Devices.length - 1)
  }
  addPriceInp(serviceIndex: number) {
    // this.Price(serviceIndex).push(this.priceDetails());
    this.countries.slice(0, 3).forEach((element: any) => {
      this.Price(serviceIndex).push(this.formBilder.group({
        country: [element._id, [Validators.required]],
        price: [, [Validators.required]]
      }));

    });
  }
  AddService() {

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
  getCounries() {
    this.reqService.getCountries().subscribe({
      next: (data) => {
        this.countries = data
        console.log(this.countries)
        this.addPriceInp(0)
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }
}
