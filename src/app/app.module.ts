import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalcComponent } from './ui/calc/calc.component';
import { GroupComponent } from './ui/calc/group/group.component';
import { SuggestionComponent } from './ui/calc/suggestion/suggestion.component';
import { ResultComponent } from './ui/calc/result/result.component';
import { HeaderComponent } from './ui/common/header/header.component';
import { FooterComponent } from './ui/common/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CalcComponent,
    GroupComponent,
    SuggestionComponent,
    ResultComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
