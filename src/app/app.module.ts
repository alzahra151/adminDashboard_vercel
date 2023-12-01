import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { SidBarComponent } from './components/sid-bar/sid-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { PriceRequestComponent } from './components/price-request/price-request.component';
import { HttpClientModule } from '@angular/common/http';
import { PriceOfferComponent } from './components/price-offer/price-offer.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DialogModule } from "primeng/dialog";
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from "primeng/button";
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { AcceptedReqComponent } from './components/accepted-req/accepted-req.component';
import { RejectedReqComponent } from './components/rejected-req/rejected-req.component';
import { NewReqsComponent } from './components/new-reqs/new-reqs.component';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/add-user/add-user.component';
// import { PrimeIcons } from 'primeicons';
import { CookieService } from 'ngx-cookie-service';
import { AddOfferPriceComponent } from './components/add-offer-price/add-offer-price.component';
// import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { AdminReqDetailsComponent } from './components/admin-req-details/admin-req-details.component';
import { AllReqsComponent } from './components/all-reqs/all-reqs.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentedReqsComponent } from './components/commented-reqs/commented-reqs.component';
import { InputTextModule } from 'primeng/inputtext';
import { ServicesComponent } from './components/services/services.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { EditeUserComponent } from './components/edite-user/edite-user.component';
import { EditeServiceComponent } from './components/edite-service/edite-service.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SidBarComponent,
    NavBarComponent,
    HomeComponent,
    PriceRequestComponent,
    PriceOfferComponent,
    OfferDetailsComponent,
    AddServiceComponent,
    AcceptedReqComponent,
    RejectedReqComponent,
    NewReqsComponent,
    LoginComponent,
    AddUserComponent,
    AddOfferPriceComponent,
    // CommentFormComponent,
    AdminReqDetailsComponent,
    AllReqsComponent,
    CommentFormComponent,
    CommentedReqsComponent,
    ServicesComponent,
    ServiceDetailsComponent,
    EditeUserComponent,
    EditeServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    CardModule,
    TableModule,
    NgxSpinnerModule,
    PaginatorModule,
    TagModule,
    SharedModule,
    MessagesModule,
    ConfirmDialogModule,
    ToastModule,
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
    MessagesModule, ButtonModule,
    ProgressSpinnerModule
  ],
  providers:
    [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
