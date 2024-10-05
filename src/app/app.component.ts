import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoursesComponent } from './courses/courses/courses.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  title = 'CrudAngular';
}
