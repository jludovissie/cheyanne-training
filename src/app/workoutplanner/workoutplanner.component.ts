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
  Diffuculty: null;
  Duration: null;
  Thoughts: null;
  clicked= false;

     workouts= [
    { workout: 'Fastball', Set: '30 Pitches' },
    { workout: 'Riseball', Set: '30 Pitches' },
    { workout: 'Dropball', Set: '30 Picthes' },
    { workout: 'Change Up', Set: '30 Pitches'}
  ];
    todaysJournal= [
      {Diffuculty: "" , Duration: "", Thoughts:""}
    ]

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  onAddWorkout() {
    this.workouts.push({workout:this.workout, Set: this.set})
  }
 onDelete(i){
   this.workouts.splice(i,1)
 }
 onAddJournal(){
   this.todaysJournal.push({Diffuculty:this.Diffuculty, Duration: this.Duration, Thoughts: this.Thoughts})
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
    this.http.post('https://course-project-3c8e4-default-rtdb.firebaseio.com/workouts.json', this.workouts).subscribe(resData =>{
      console.log(resData)
    }

    )
  }
  onFetchWorkout(){
    this.http.get('https://course-project-3c8e4-default-rtdb.firebaseio.com/workouts.json' ).subscribe(workouts => {
      console.log(Object.entries(workouts));
      this.workouts = Object.entries(workouts)[0][1]
    });
    }
    onClearLog(){
      return this.http.delete(
      'https://course-project-3c8e4-default-rtdb.firebaseio.com/workouts.json').subscribe(() => {
        this.workouts = [];
      })
  }
  onSubmitJournal(){

    }
    toggle(){
      this.clicked = !this.clicked
      console.log('worked')
    }
}
