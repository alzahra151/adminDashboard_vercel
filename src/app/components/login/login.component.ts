import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userData: any
  loading: boolean = false
  visible: boolean = false
  constructor(private user: UserService, private formBilder: FormBuilder, private router: Router, private cookieService: CookieService, private spinner: NgxSpinnerService) {
    this.loginForm = formBilder.group({
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
    this.spinner.hide();

  }
  login() {
    this.spinner.show()
    // const { Email, Password } = this.loginForm.value
    console.log(this.loginForm.value)
    // console.log("nsnqknlkm,mnabnfewgfgd")
    this.user.Login(this.loginForm.value).subscribe({
      next: (data) => {
        this.userData = data
        this.loading = true
        console.log(this.userData.AccessToken)
        localStorage.setItem('AdminToken', this.userData.AccessToken)
        localStorage.setItem('AdminRole', this.userData.StoredRepresent.Role)
        // localStorage.setItem('userId', this.userData.result.StoredRepresent.id)
        if (this.userData.StoredRepresent.Role == 'customerService') {
          this.router.navigate(['/customer-service'])
        }
        else {
          this.router.navigate(['/home'])
        }


      },
      error: (err) => {
        this.spinner.hide()
        this.showDialog()
      }
    })
  }
  get token() {
    return localStorage.getItem('AdminToken')
  }
  showDialog() {
    this.visible = true
  }
}
