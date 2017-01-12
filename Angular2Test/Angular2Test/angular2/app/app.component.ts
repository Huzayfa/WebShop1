import { Component } from '@angular/core';

@Component({
    selector: 'pm-app',
    template: `
        <h1>{{pageTitle}}</h1>
        <h2>Angular2: Getting Started</h2>
    `
})
export class AppComponent {
    pageTitle: string = "Angular2 Page Title";
}
