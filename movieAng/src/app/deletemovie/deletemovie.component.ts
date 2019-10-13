import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-deletemovie',
  templateUrl: './deletemovie.component.html',
  styleUrls: ['./deletemovie.component.css']
})
export class DeletemovieComponent implements OnInit {
  private movieDB: any[] = [];
  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.getListMovie();
  }

  getListMovie() {
    return this.dbService.getMovie().subscribe((data: any[]) => {
      this.movieDB = data;
    });
  }

  deleteMovie(item){
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.getListMovie();
      this.router.navigate(["/deletemovie"]);
    });
  }
}
