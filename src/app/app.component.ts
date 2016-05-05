import {Component} from '@angular/core';

import {AppState} from './app_state.service.ts';

@Component({
	selector: 'app',
	pipes: [],
	providers: [],
	directives: [],
	styles: [],
	template: `<div>Hello World! This is Raw ng2!</div>`
})
export class App {
	onLoadWelcomeMessage: string = `Hello ngConf! I'm logging on ngOnInit()`;
	name: string = 'Angular 2 RC Raw Webpack Boilerplate';

	constructor(public appState: AppState) {}

	ngOnInit() {
		console.log(this.onLoadWelcomeMessage, `App state is ${this.appState.state}`);
	}
}
