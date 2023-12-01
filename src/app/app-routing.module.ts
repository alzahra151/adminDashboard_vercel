import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { NewReqsComponent } from './components/new-reqs/new-reqs.component';
import { PriceRequestComponent } from './components/price-request/price-request.component';
import { LoginComponent } from './components/login/login.component';
import { AddOfferPriceComponent } from './components/add-offer-price/add-offer-price.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminReqDetailsComponent } from './components/admin-req-details/admin-req-details.component';
import { roleGuard } from './guards/role.guard';
import { AllReqsComponent } from './components/all-reqs/all-reqs.component';
import { AcceptedReqComponent } from './components/accepted-req/accepted-req.component';
import { RejectedReqComponent } from './components/rejected-req/rejected-req.component';
import { CommentedReqsComponent } from './components/commented-reqs/commented-reqs.component';
import { ServicesComponent } from './components/services/services.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { EditeUserComponent } from './components/edite-user/edite-user.component';
import { EditeServiceComponent } from './components/edite-service/edite-service.component';

const routes: Routes = [
  // { path: "", component: LoginComponent, },
  // { path: "Offer/:id", component: OfferPDFComponent },
  // {
  //   path: "home", component: MainLayoutComponent,
  //   children: [

  //     { path: "", component: HomeComponent }
  //   ]
  // },
  { path: "", component: LoginComponent },
  {
    path: "home", component: MainLayoutComponent, canActivate: [AuthGuard],
    children: [

      { path: "", component: HomeComponent, canActivate: [AuthGuard] },

      { path: "all-reqs", component: AllReqsComponent },

      { path: "offerDetails/:id", component: OfferDetailsComponent, canActivate: [roleGuard] },
      { path: "NewRequestes/admin-offer-details/:id", component: AdminReqDetailsComponent, },
      { path: "accepted-requests", component: AcceptedReqComponent },
      { path: "rejected-requests", component: RejectedReqComponent },
      { path: "commented-requests", component: CommentedReqsComponent },
      { path: "add-service", component: AddServiceComponent },
      { path: "add-service/:id", component: EditeServiceComponent },
      { path: "services", component: ServicesComponent },
      { path: "services/service-details/:id", component: ServiceDetailsComponent },
      { path: "NewRequestes", component: NewReqsComponent },
      { path: "AddOffer/:id", component: AddOfferPriceComponent },
      { path: "AddUser", component: AddUserComponent },
      { path: "edit-user", component: EditeUserComponent }
    ]
  },
  // { path: "offerDetails/:id", component: OfferDetailsComponent },
  // { path: "Services", component: AddServiceComponent },
  // { path: "NewRequestes", component: NewReqsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
