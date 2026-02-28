import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app';
import { appConfig } from './app.config';

export const AppServerModule = bootstrapApplication(App, appConfig);
