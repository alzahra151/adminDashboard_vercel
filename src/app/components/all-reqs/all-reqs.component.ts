import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { io } from 'socket.io-client';
import { AuthService } from 'src/app/services/auth.service';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';

@Component({
  selector: 'app-all-reqs',
  templateUrl: './all-reqs.component.html',
  styleUrls: ['./all-reqs.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AllReqsComponent {
  Requestes: any
  AcceptedReq: any
  RejectedReq: any
  // AddReqComment: FormGroup
  SelectedReq: any
  DeletedOffer: any
  SelectedOfferInfo: any
  socket = io('https://varrox-system-apii.onrender.com');
  constructor(private ReqService: PriceOfferReqService, private primengConfig: PrimeNGConfig,
    private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService
    , private authService: AuthService) {

    // Listen for changes on the user change stream
    // this.socket.on('ReqChange', (change) => {
    //   console.log('User change:', change);
    //   // this.getReqs()
    // });
  }

  ngOnInit() {
    this.getReqs(5, 0)

  }
  getReqs(limit: any, page: any) { //get all requests
    this.ReqService.getAllReq(limit, page).subscribe({
      next: (data) => {
        this.Requestes = data
        // console.log(this.Requestes)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
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

  get AgentImage() {
    return localStorage.getItem('Image')
  }
  onPageChange(event: any) {
    console.log(event)
    console.log(event.page)
    this.getReqs(event.rows, event.page)
  }
}
