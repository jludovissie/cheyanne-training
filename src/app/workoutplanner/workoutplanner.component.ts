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
  value: any;

  workouts= [
    { workout: 'Fastball', Set: '30 Pitches' },
    { workout: 'Riseball', Set: '30 Pitches' },
    { workout: 'Dropball', Set: '30 Picthes' },
    { workout: 'Change Up', Set: '30 Pitches'}
  ];


  constructor() { }

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
    this.value = document.getElementById("myRange")
  }
}
