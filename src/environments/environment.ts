// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { StoreDevtoolsModule } from "@ngrx/store-devtools";

export const environment = {
  production: false,
  // apiUrl: 'https://localhost:5001'
  // apiUrl: 'https://localhost:44394'
  apiUrl: 'https://sprintbetapi.herokuapp.com',
  /**
   * Hopefully this is fixed now...
   * https://github.com/ngrx/platform/issues/1054
   */
  extModules: StoreDevtoolsModule.instrument({
    maxAge: 25
  }),
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
