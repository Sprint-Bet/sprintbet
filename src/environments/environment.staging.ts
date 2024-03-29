// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { StoreDevtoolsModule } from "@ngrx/store-devtools";

export const environment = {
  production: true,
  apiUrl: 'https://sprintbetapi-production.up.railway.app',
  extModules: StoreDevtoolsModule.instrument({
    maxAge: 25
  }),
};
