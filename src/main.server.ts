import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { Home2Component } from './app/components/home2/home2.component';


const bootstrap = () => bootstrapApplication(Home2Component, config);

export default bootstrap;
