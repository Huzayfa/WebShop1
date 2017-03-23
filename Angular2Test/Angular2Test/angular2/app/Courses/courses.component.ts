import { Component } from '@angular/core';
import {CourseService} from './course.service'

@Component({
    selector: 'courses',
    template: `
    < h2 > Corses < /h2>
    {{title}}
    <ul>
        <li *ngFor="let course of courses">
            {{course}}
        </li>
    </ul>
    `,
    providers:[CourseService],

})
export class CoursesComponent {
    title: string = "The title of the courses page";
    courses :string[];
    constructor(courseService: CourseService) {
        this.courses = courseService.getCourses();
    }
}