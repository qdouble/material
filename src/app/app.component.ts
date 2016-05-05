import {Component} from '@angular/core';

import {AppState} from './app_state.service.ts';

@Component({
	selector: 'app',
	pipes: [],
	providers: [],
	directives: [],
	styles: [],
	template: `<div>Let's get this party started in here! </div>`
})
export class App {
	onLoadWelcomeMessage: string = `Hello world! I'm logging on ngOnInit() on main app.component.ts`;
	name: string = 'Angular 2 RC Raw Webpack Boilerplate';

	constructor(public appState: AppState) {}

	ngOnInit() {
		console.log(this.onLoadWelcomeMessage, `App state is ${this.appState.state}`);
	}
}
