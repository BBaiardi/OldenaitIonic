// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyB6qEb2w_YaBZCnrp_Cjn8oMbFGrjHXhzo',
    authDomain: 'heroic-icon-151001.firebaseapp.com',
    databaseURL: 'https://heroic-icon-151001.firebaseio.com',
    projectId: 'heroic-icon-151001',
    storageBucket: 'heroic-icon-151001.appspot.com',
    messagingSenderId: '289878522015'
  },
  googleMapsKey: 'AIzaSyDoTE2IidqGS3qkvZXcgeHkM0pBafY2WkY',
  algolia : {
    appId: 'NWEOAX6K2U',
    apiKey: '99c8f54c6696b05c8205db6f21abe04f'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
