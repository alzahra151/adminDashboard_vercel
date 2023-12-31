import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  userData: any
  registerForm: FormGroup
  public roles: any = ['Manager', 'secretarial', 'customerService'];
  constructor(private user: UserService, private formBilder: FormBuilder, private router: Router) {
    this.registerForm = formBilder.group({
      FullName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]{3,}( {1,2}[a-zA-Z]{3,}){1,}$")]],
      Password: ['', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,18}$")]],
      Confirm_Password: ['', [Validators.required]],
      Mobile: ['', [Validators.required]],
      Phone: [''],
      Email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Country: ['', [Validators.required]],
      Role: ['']
    },)
  }
  get password() {
    return this.registerForm.controls['Password'].value
  }
  get confrimPassword() {
    return this.registerForm.controls["Confirm_Password"].value
  }
  get FullName() {
    return this.registerForm.get("FullName")
  }
  get User_Password() {
    return this.registerForm.get("Password")
  }
  get Confirm_Password() {
    return this.registerForm.get("Confirm_Password")
  }
  get User_Mobile() {
    return this.registerForm.get("Mobile")
  }
  //  get User_Mobile(){
  //   return this.registerForm.get("Mobile")
  //  }
  get User_Email() {
    return this.registerForm.get("Email")
  }
  get User_Adress() {
    return this.registerForm.get("Country")
  }

  register() {
    let user = this.registerForm.value
    console.log(user)
    this.user.Register(user).subscribe({
      next: (data) => {
        console.log(data)
        this.registerForm.reset()
        // this.router.navigate(['/'])
      },
      error: (err) => {
        console.log(err)
      }

    })
  }

}
