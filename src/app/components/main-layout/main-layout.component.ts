import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  userImage: any
  user: any
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userImage = localStorage.getItem("Image")
    this.getUser()
  }

  getUser() {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data
        console.log(this.user)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
