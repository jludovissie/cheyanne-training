import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated= false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  this.authService.currentUser.subscribe((user) =>{
    this.isAuthenticated = !!user;
  })
  }
  ngOnDestroy(){
    this.authService.currentUser.unsubscribe();
  }
  onSignOut(){
    this.authService.signOut();

  }

}
