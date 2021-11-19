import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-workoutplanner',
  templateUrl: './workoutplanner.component.html',
  styleUrls: ['./workoutplanner.component.css']
})
export class WorkoutplannerComponent implements OnInit {
  workout: null;
  set: null;
  timeLeft: number;
  timerInterval: any;
  Date= new Date();
  value: number= 50;
  isFetching= false;

     workouts= [
    { workout: 'Fastball', Set: '30 Pitches' },
    { workout: 'Riseball', Set: '30 Pitches' },
    { workout: 'Dropball', Set: '30 Picthes' },
    { workout: 'Change Up', Set: '30 Pitches'}
  ];


  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  onAddWorkout() {
    this.workouts.push({workout:this.workout, Set: this.set})
  }
 onDelete(i){
   this.workouts.splice(i,1)

 }
  startRest(){
    if (this.timerInterval) clearInterval(this.timerInterval)
     this.timeLeft = 60
     this.timerInterval = setInterval(() => {
      this.timeLeft--
    if (this.timeLeft === 0) clearInterval(this.timerInterval)

     },1000)
   }
   slider(){
    this.value = parseFloat((<HTMLInputElement>document.getElementById("myRange")).value)
  }
  onSubmitWorkout(){
    this.http.post('https://courseproject-7f1e5-default-rtdb.firebaseio.com/posts.json', this.workouts).subscribe(resData =>{
      console.log(resData)
    }

    )
  }
  onFetchWorkout(){
    this.http.get('https://courseproject-7f1e5-default-rtdb.firebaseio.com/posts.json' ).subscribe(workouts => {
      console.log(Object.entries(workouts));
      this.workouts = Object.entries(workouts)[0][1]
    });
    }
    onClearLog(){
      return this.http.delete(
      'https://courseproject-7f1e5-default-rtdb.firebaseio.com/posts.json').subscribe(() => {
        this.workouts = [];
      })
  }
}
