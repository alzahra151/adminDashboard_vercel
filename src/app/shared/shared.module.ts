import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReqCardComponent } from './commponents/req-card/req-card.component';
import { RouterModule } from '@angular/router';
// import { CommentFormComponent } from '../components/comment-form/comment-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReqCardComponent,
    // ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule, ReqCardComponent]
})
export class SharedModule { }
