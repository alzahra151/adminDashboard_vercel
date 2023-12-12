import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  userImage: any
  user: any
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    // this.userImage = localStorage.getItem("Image")
    this.userService.imageSubject.subscribe({
      next: (data) => {
        console.log(data)
        this.userImage = localStorage.getItem("AdminImag")
      }
    })
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
