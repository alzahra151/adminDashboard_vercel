import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PriceOfferReqService } from 'src/app/services/price-offer-req.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent {
  @Input() reqID: any;
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private ReqService: PriceOfferReqService, private router: Router) {

    this.myForm = this.formBuilder.group({
      Comment: ['', [Validators.required, Validators.minLength(5)]],
    });

  }

  ResendReqToRep() {
    console.log(this.reqID)
    const UpdatedData = { ...this.myForm.value, Complete: false }
    console.log(UpdatedData)
    this.ReqService.updateReq(this.reqID, UpdatedData).subscribe({
      next: (data) => {

        console.log(data)
        this.router.navigate(['home/commented-requests'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
