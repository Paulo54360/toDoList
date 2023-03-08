import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {IonicModule} from "@ionic/angular";
import {AppRoutingModule} from "./app-routing.module";
import {NgModule} from "@angular/core";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
