import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { io } from 'socket.io-client'
import { Roles } from 'src/app/models/Roles.enum';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-price-request',
  templateUrl: './price-request.component.html',
  styleUrls: ['./price-request.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class PriceRequestComponent implements OnInit {
  @ViewChild('defaultModalButton', { static: true }) defaultModalButton!: ElementRef
  Requestes: any
  AcceptedReq: any
  RejectedReq: any
  // AddReqComment: FormGroup
  SelectedReq: any
  DeletedOffer: any
  SelectedOfferInfo: any
  socket = io('http://localhost:3000');
  constructor(private ReqService: PriceOfferReqService, element: ElementRef, private primengConfig: PrimeNGConfig,
    private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService
    , private authService: AuthService) {

    // Listen for changes on the user change stream
    this.socket.on('ReqChange', (change) => {
      console.log('User change:', change);
      // this.getReqs()
    });

  }

  ngOnInit() {
    // this.getReqs()

  }
  // getReqs() { //get all requests
  //   this.ReqService.getAllReq().subscribe({
  //     next: (data) => {
  //       this.Requestes = data
  //       console.log(this.Requestes)
  //     },
  //     error: (err) => {
  //       console.log(err)
  //     }
  //   })
  // }
  AcceptReq(req: any) {
    console.log(req)
    let id = req._id
    console.log(id)
    req.Accept = true
    req.Pending = false
    this.ReqService.updateReq(id, req).subscribe({
      next: (data) => {
        this.AcceptedReq = data
        console.log(this.AcceptedReq)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  RegectReq(req: any) {
    let id = req._id
    console.log(id)
    req.Accept = false
    req.Pending = false
    this.ReqService.updateReq(req._id, req).subscribe({
      next: (data) => {
        this.RejectedReq = data
        console.log(this.RejectedReq)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }




  confirmDelete() {
    this.confirmationService.confirm({
      message: 'هل انت متأكد أنك تريد حذف هذا العرض؟',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ReqService.deletePriceOffer(this.DeletedOffer._id).subscribe({
          next: (data) => {
            console.log("deleted Successfully")
            this.messageService.add({ severity: 'success', summary: 'حذف عرض السعر ', detail: '  تم الحذف' });
          },
          error: (error) => {
            console.log(error.message)
          }
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'حذف عرض السعر', detail: 'لم يتم الحذف' });

      }
    });
  }
  openConfirmDeleteDialog(offer: any) {
    this.DeletedOffer = offer
    this.confirmDelete()
  }

  showSuccessMessage() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'تم ارسال الطلب بنجاح.' });
  }
  showErrorMessage() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'خطأ أثناء اضافة عرض السعر.' });
  }


}

