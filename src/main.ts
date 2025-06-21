import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import * as Sentry from "@sentry/angular";
import { enableProdMode, ErrorHandler } from '@angular/core';
import { environment } from './environments/environment';

Sentry.init({
  dsn: 'https://7fa6894d9cedc3dc94dcc0a058523831@o4509537593065472.ingest.us.sentry.io/4509537600143360',
  sendDefaultPii: true
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
