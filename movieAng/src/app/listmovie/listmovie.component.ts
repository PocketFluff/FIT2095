import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-listmovie',
  templateUrl: './listmovie.component.html',
  styleUrls: ['./listmovie.component.css']
})
export class ListmovieComponent implements OnInit {
  private movieDB: any[] = [];

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.dbService.getMovie().subscribe((data: any[]) => {
      this.movieDB = data;
    })
  }

}
