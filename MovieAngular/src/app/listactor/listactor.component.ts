import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-listactor",
  templateUrl: "./listactor.component.html",
  styleUrls: ["./listactor.component.css"],
})
export class ListactorsComponent implements OnInit {
  private actorsDB: any[] = [];

  constructor(private dbService: DatabaseService) {}

  ngOnInit() {
    console.log("Hi From ListActors ngIOnit");

    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
}