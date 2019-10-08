import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  actorsDB2: any[] = [];
  moviesDB: any[] = [];

  section = 1;

  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  title: string = "";
  year: number = 0;
  delYear: number = 0;
  selectedActor: string = "";
  selectedMovie: string = "";

  constructor(private dbService: DatabaseService) {}

  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
    this.onGetActors();
    this.onGetMovies();
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
    this.year = 0;
    this.title = "";
  }

  onSaveMovie(){
    let mov = {title: this.title, year: this.year}
    this.dbService.createMovie(mov).subscribe(result => {
      this.onGetMovies();
    });
  }

  onGetMovies(){
    this.dbService.getMovie().subscribe((data: any[]) => {
      this.moviesDB = data;
    })
  }
  
  onDeleteMovie(item){
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  onDelMovieYear(){
    let i : string = "";
    i = this.delYear.toString();
    this.dbService.deleteMovieYear(i).subscribe(result => {
      this.onGetMovies();
    });
  }

  onSelectActor(actor){
    this.selectedActor = actor._id;
  }

  onSelectMovie(movie){
    this.selectedMovie = movie._id;
  }

  addMovieToActor(){
    this.dbService.addMovieToActor(this.selectedActor,this.selectedMovie).subscribe(result => {
      this.onGetMovies();
    })
  }

  changeSection2(){
    this.section = 10;

    this.dbService.getActors().subscribe((data2: any[]) => {
      for (let i = 0; i < data2.length;i++){
        if (data2[i].movies.length < 2){
          data2.splice(i, 1);
          i--;
        }
      }
      this.actorsDB2 = data2;
      this.resetValues();
      this.onGetActors();
      this.onGetMovies();
    });
  }
}