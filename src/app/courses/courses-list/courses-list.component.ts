import { Component, Input } from '@angular/core';
import { Course } from '../model/course';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    CommonModule,
    AppMaterialModule,
    SharedModule
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {

  @Input() courses: Course[] = [];
  readonly displayedColumns = ['_id', 'name', 'category', 'actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){}

  public onAddCourse() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }


}
