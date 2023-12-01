import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';

@Component({
  selector: 'app-edite-service',
  templateUrl: './edite-service.component.html',
  styleUrls: ['./edite-service.component.scss']
})
export class EditeServiceComponent {
  serviceForm: FormGroup
  services: any
  serviceID: any
  service: any
  IsAddMode: boolean = false
  loading: boolean = true
  deviceEditeDailog: boolean = false
  editedDevice: any
  deletedDevice: any
  constructor(private reqService: PriceOfferReqService, private formBilder: FormBuilder, private route: ActivatedRoute) {
    this.serviceForm = formBilder.group({
      Name: ['', [Validators.required]],
      Details: formBilder.array([formBilder.control('')]),
      Devices: formBilder.array([this.deviceDetails()]),
      // Maintenance: formBilder.group({
      //   description: ['', [Validators.required]],
      //   price: ['', [Validators.required]]
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
  // get Maintenance() {
  //   return this.serviceForm.get("Maintenance");
  // }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.serviceID = params['id']
      console.log(this.serviceID)
      this.getServiceById(this.serviceID)

    })
    this.getServices()
  }
  deviceDetails(): FormGroup {
    return this.formBilder.group({
      Title: [''],
      Price: []
    })
  }
  addServiceDetail() {
    this.Details.push(this.formBilder.control(''));
  }
  addServiceDevice() {
    this.Devices.push(this.deviceDetails());
  }
  AddService() {

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
    const fieldsToExclude = ['Devices'];

    // Create a new object excluding specified fields
    const newService = Object.fromEntries(
      Object.entries(this.service).filter(([key]) => !fieldsToExclude.includes(key))
    );

    console.log(newService);
    this.serviceForm.patchValue(newService);
    console.log(this.serviceForm.get('Devices'))

    // this.serviceForm.patchValue(this.service.Devices[0])
  }
  openDiaolg(device: any) {
    this.deviceEditeDailog = true
    this.editedDevice = device
    console.log(this.editedDevice)
  }
  editeDevice() {
    this.reqService.editeDevice(this.editedDevice._id, this.editedDevice).subscribe({
      next: (data) => {
        console.log(data)
        this.deviceEditeDailog = false
      },
      error: (err) => {
        console.log(err.message)
      }
    })

  }
  deleteDevice(deviceId: any) {
    this.reqService.deleteDevice(deviceId).subscribe({
      next: (data) => {
        console.log(data)

        this.getServiceById(this.serviceID)
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }
}

