import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
@ViewChild('f') signupForm : NgForm;


constructor() { }

ngOnInit(): void {}
onSubmit(signupForm : NgForm){
console.log(this.signupForm)
}


}
