import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { io } from 'socket.io-client';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ServicesComponent implements OnInit {
  services: any
  constructor(private reqService: PriceOfferReqService, private messageService: MessageService, private primengConfig: PrimeNGConfig, private confirmationService: ConfirmationService) {

  }
  ngOnInit(): void {
    this.getServices()
  }
  getServices() {
    this.reqService.getServices().subscribe({
      next: (data) => {
        this.services = data
        console.log(this.services)
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }
  deleteService(id: any) {
    this.reqService.deleteService(id).subscribe({
      next: (data) => {
        console.log(`delete ${data} successfully`)


      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }
  confirmDelete(serviceId: any) {
    this.confirmationService.confirm({
      message: 'هل انت متأكد أنك تريد حذف هذه الخدمة ؟',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.reqService.deleteService(serviceId).subscribe({
          next: (data) => {
            console.log("deleted Successfully")
            this.getServices()
            this.messageService.add({ severity: 'success', summary: 'Delete Service ', detail: '  تم الحذف' });
          },
          error: (error) => {
            console.log(error.message)
          }
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: ' Delete Service ', detail: 'لم يتم الحذف' });

      }
    });
  }

}
