import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-addactortomovie',
  templateUrl: './addactortomovie.component.html',
  styleUrls: ['./addactortomovie.component.css']
})
export class AddactortomovieComponent implements OnInit {
  private movieDB: any[] = [];
  private actorDB: any[] = [];
  selectedActor: string = "";
  selectedMovie: string = "";

  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.dbService.getActors().subscribe((data : any[]) => {
      this.actorDB = data;
    });
    this.dbService.getMovie().subscribe((data2: any[]) => {
      this.movieDB = data2;
    });
  }

  selectActor(actor){
    this.selectedActor = actor._id;
  }

  selectMovie(movie){
    this.selectedMovie = movie._id;
  }

  addmovietoactor(){
    this.dbService.addMovieToActor(this.selectedActor,this.selectedMovie).subscribe(result => {
      this.addactortomovie();
    });
  }

  addactortomovie(){
    this.dbService.addActorToMovie(this.selectedActor, this.selectedMovie).subscribe(result => {
      this.router.navigate(["/listactors"]);
    })
  }

}
