import { Component } from '@angular/core';
import { CoursesComponent } from './courses.component';
@Component({
    selector: 'pm-app',
    template: `
        <h1>{{pageTitle}}</h1>
        <h2>Angular2: Getting Started</h2>
        <courses></courses>
    `,
    directives:[CoursesComponent],

})
export class AppComponent {
    pageTitle: string = "Angular2 Page Title";
}
