import { Component } from '@angular/core';
// import { ROUTER_DIRECTIVES } from '@angular/router';
import { AppState } from './app-state.service.ts';

@Component({
  selector: 'app',
  pipes: [],
  providers: [],
  directives: [
    // ROUTER_DIRECTIVES // Enable for new router
  ],
  styles: [require('./app.scss')],
  template: require('./app.html')
})
export class App {

  constructor(public appState: AppState) { }

  ngOnInit() {
    console.log(`App state is ${JSON.stringify(this.appState.state)}`);
  }
  
}
