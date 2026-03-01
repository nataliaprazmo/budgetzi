import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { renderApplication } from '@angular/platform-server';
import express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/budget-tracker');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? join(distFolder, 'index.original.html')
    : join(distFolder, 'index.html');

  server.engine('html', async (filepath: string, options: any, callback: any) => {
    try {
      const bootstrap = (await import('./src/main.server')).default;
      const rendered = await renderApplication(bootstrap, {
        url: options.req?.originalUrl || '/',
        platformProviders: [{ provide: APP_BASE_HREF, useValue: options.req?.baseUrl || '/' }],
      });

      callback(null, rendered);
    } catch (err) {
      callback(err);
    }
  });

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    }),
  );

  server.get('*', (req: any, res: any) => {
    res.render(indexHtml, { req, res });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
