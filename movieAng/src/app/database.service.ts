import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;

  getActors() {
    return this.http.get("/actors");
  }
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data) {
    return this.http.post("/actors", data, httpOptions);
  }
  updateActor(id, data) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }
  createMovie(data) {
    return this.http.post("/movies", data, httpOptions);
  }
  getMovie(){
    return this.http.get("/movies");
  }
  deleteMovie(id){
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
  }
  deleteMovieYear(year: string){
    let urlDel = "/movie/" + year;
    return this.http.delete(urlDel, httpOptions);
  }
  addMovieToActor(actorId: string, movieId: string){
    let urlAct = "/movies/" + movieId + "/" + actorId;
    return this.http.post(urlAct, httpOptions);
  }
  addActorToMovie(actorId: string, movieId: string){
    let urlMov = "/actors/" + actorId + "/movies";
    let dataMov = {movieid : movieId}
    return this.http.post(urlMov, dataMov, httpOptions);
  }
  actorsWith2Movies(){
    let url = "/actor";
    return this.http.get(url, httpOptions);
  }
}