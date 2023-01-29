import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CondtionsActuellesComponent } from './condtions-actuelles/condtions-actuelles.component';
import { ProchainesHeuresComponent } from './prochaines-heures/prochaines-heures.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NormalePipe } from './normale.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CondtionsActuellesComponent,
    ProchainesHeuresComponent,
    HeaderComponent,
    FooterComponent,
    NormalePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
