import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Router } from '@angular/router';
import "bootstrap"
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
