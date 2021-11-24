import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Quote is set inside the function
  quote;
  interval;
  constructor(private http: HttpClient) { }

ngOnInit(): void {
  // myQuote doesn't exist in the class scope
  // console.log(myQuote);
  this.getQuote();
  this.interval = setInterval(() =>{
    // Call the function in here
    this.getQuote()

  },864000000000)
  // Interval will be set here, but will need to be set to a property outside oninit so it can be cleared onDestroy
}

getQuote(){
  this.http.get('https://type.fit/api/quotes').subscribe((response) => {
    console.log('response', response)
    // myQuote only exists inside the scope of this function
    // A property outside this function would have to be set to this value

    // Math.random() returns a number between 0 and 1 (Not including 1), and Math.floor() rounds the number down, so it will always be 0 and return the same joke
    // Math.floor(Math.random() * 10) would return a random number from 0-9   doppeee  probably need to change the interval
    const myQuote = response[Math.floor(Math.random() * 100)];

    // Here we set the outer property with this value, so we can access it from an outside scope
    this.quote = myQuote;
    console.log(this.quote);

  //  let mygroceries = groceries[Math.floor(Math.random() * groceries.length)]
  // Can you see my console?
  // No, share the server under the live share tab...Did that work? Yeah  Ideally, I would like the quote to be there without having to push the button
  // I'l leave it in oninit then, the property response doesn't exist on quote so deleting it fixes that error
  // It looks like it is showing [object object]
  // It has a text and an author property, you could display both or just the text....Do I have to set that somewhere?
  // No you can use {{ quote.text }}
  // To prevent that error, add ngIf to the quote <p>  Do you know when that will pull a new quote? if i dont have a button
  // Only when the component is reloaded you could set an Interval to have it refresh every x seconds.  Thats a good idea.  I will attempt but you may have to walk me through
  // No problem
  //onDestroy correct?
  // Yes but also needs to be implemeted at the class definition
  // I appreciate the help!
  });
  // No problem!
  //awesome!
  }
 ngOnDestroy(){
   clearInterval(this.interval)
 }
}
