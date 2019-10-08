// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAIS5Ntqyu_W1AQpt1hGAQgWkT6vqKFiHs",
    authDomain: "the-cooking-book.firebaseapp.com",
    databaseURL: "https://the-cooking-book.firebaseio.com",
    projectId: "the-cooking-book",
    storageBucket: "the-cooking-book.appspot.com",
 },
 admob: {
  adModId: "ca-app-pub-2353083446677425~9219536827",
  intersticialId: "ca-app-pub-2353083446677425/7707144602"
 }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
