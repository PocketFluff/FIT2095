import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { DatabaseService } from "./database.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ListactorsComponent } from "./listactors/listactors.component";
import { AddactorComponent } from "./addactor/addactor.component";
import { DeleteactorComponent } from "./deleteactor/deleteactor.component";
import { UpdateactorComponent } from "./updateactor/updateactor.component";
import { RouterModule, Routes } from "@angular/router";
import { AddmovieComponent } from './addmovie/addmovie.component';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { ListmovieComponent } from './listmovie/listmovie.component';
import { AddactortomovieComponent } from './addactortomovie/addactortomovie.component';
import { Error404Component } from './error404/error404.component';

const appRoutes: Routes = [
  { path: "listactors", component: ListactorsComponent },
  { path: "addactor", component: AddactorComponent },
  { path: "updateactor", component: UpdateactorComponent },
  { path: "deleteactor", component: DeleteactorComponent },
  { path: "addmovie", component: AddmovieComponent},
  { path: "deletemovie", component: DeletemovieComponent},
  { path: "listmovie", component: ListmovieComponent},
  { path: "addactortomovie", component: AddactortomovieComponent},
  { path: "", redirectTo: "/listactors", pathMatch: "full" },
  { path: "**", component: Error404Component}
];

@NgModule({
  declarations: [
    AppComponent,
    ListactorsComponent,
    AddactorComponent,
    UpdateactorComponent,
    DeleteactorComponent,
    AddmovieComponent,
    DeletemovieComponent,
    ListmovieComponent,
    AddactortomovieComponent,
    Error404Component,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),

    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}