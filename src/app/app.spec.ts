import {
  it,
  inject,
  beforeEachProviders
} from '@angular/core/testing';

// Load the implementations that should be tested
import { App } from './app.component';
// import {AppState} from './app-state.service';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    // AppState,
    App
  ]);

  it('should have a name', inject([ App ], (app) => {
    expect(app.name).toEqual('Angular 2 RC Raw Webpack Boilerplate');
  }));

});
