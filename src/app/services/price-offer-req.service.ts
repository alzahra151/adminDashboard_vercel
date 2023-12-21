import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PriceOfferReqService {

  options = {}

  constructor(private httpClient: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': 'token ' + this.token
      }),
    }
  }
  get token() {
    return localStorage.getItem('AdminToken')
  }
  getAllReq(limit: any, page: any) {
    return this.httpClient.get(`${environment.apiUrl}/PriceOfferReq/completed-requests?limit=${limit}&page=${page}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': 'token ' + this.token
      }),
    })
  }
  updateReq(id: any, data: any) {
    return this.httpClient.patch(`${environment.apiUrl}/PriceOfferReq/${id}`, data)
  }
  addPriceoffer(data: any) {
    return this.httpClient.post(`${environment.apiUrl}/PriceOffer/AddPriceOffer`, data)
  }
  getAllPriceOffers() {
    return this.httpClient.get(`${environment.apiUrl}/PriceOffer/GetAllPriceOffer`, this.options)
  }
  updatePriceOffer(id: any, data: any) {
    return this.httpClient.patch(`${environment.apiUrl}/PriceOffer/${id}`, data)
  }
  deletePriceOffer(id: any) {
    return this.httpClient.delete(`${environment.apiUrl}/PriceOffer/${id}`)
  }
  getOfferByID(id: any) {
    return this.httpClient.get(`${environment.apiUrl}/PriceOffer/${id}`)
  }
  addNewService(data: any) {
    return this.httpClient.post(`${environment.apiUrl}/Service`, data)
  }
  getNewReqCount() {
    return this.httpClient.get(`${environment.apiUrl}/PriceOfferReq/NewReqCount`)
  }
  getAcceptedReq(limit: any, page: any) {
    return this.httpClient.get(`${environment.apiUrl}/PriceOfferReq/salesMangersApprovedReq?limit=${limit}&page=${page}`)
  }
  getRejectedReq() {
    return this.httpClient.get(`${environment.apiUrl}/PriceOfferReq/rejected-req`)
  }
  getNewReqs() {
    return this.httpClient.get(`${environment.apiUrl}/PriceOfferReq/new-reqs`)
  }
  getReqByID(id: any) {
    return this.httpClient.get(`${environment.apiUrl}/PriceOfferReq/${id}`)
  }
  getServices() {
    return this.httpClient.get(`${environment.apiUrl}/Service/GetServices`)
  }
  getCommentedReqs() {
    return this.httpClient.get(`${environment.apiUrl}/PriceOfferReq/commented-reqs`, {
      headers: {
        "Accept": "application/pdf"
      }, responseType: 'blob'
    })
  }
  getServicebyId(id: any) {
    return this.httpClient.get(`${environment.apiUrl}/Service/get-service/${id}`)
  }
  deleteService(id: any) {
    return this.httpClient.delete(`${environment.apiUrl}/service/${id}`)
  }
  editeService(id: any, data: any) {
    return this.httpClient.patch(`${environment.apiUrl}/Service/${id}`, data)
  }
  downloadPDF(data: any) {
    return this.httpClient.post(`${environment.apiUrl}/PDF/down-pdf`, data, {
      headers: {
        "Accept": "application/pdf"
      }, responseType: 'blob'
    })

  }
  reqsCount() {
    return this.httpClient.get(`${environment.apiUrl}/PriceOfferReq/reqs-count`)
  }
  editeDevice(id: any, data: any) {
    return this.httpClient.patch(`${environment.apiUrl}/Device/${id}`, data)
  }
  deleteDevice(id: any) {
    return this.httpClient.delete(`${environment.apiUrl}/Device/${id}`)
  }
  approveReq(id: any) {
    return this.httpClient.patch(`${environment.apiUrl}/PriceOfferReq/approve-req/${id}`, {})
  }
  getCountries() {
    return this.httpClient.get(`${environment.apiUrl}/Country/countries`)
  }
}
