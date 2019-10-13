import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router, Data } from "@angular/router";

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {
  movieTitle: string = "";
  movieYear: number = 0;

  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit() {
  }

  onSaveMovie() {
    let newMovie = {title: this.movieTitle, year: this.movieYear};
    this.dbService.createMovie(newMovie).subscribe(result => {
      this.router.navigate(["/listmovie"]);
    })
  }

}
