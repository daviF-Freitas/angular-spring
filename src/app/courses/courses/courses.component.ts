import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { catchError, Observable, of } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { CoursesRoutingModule } from '../courses-routing.module';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    SharedModule,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  public courses$: Observable<Course[]>;
  // public courses: Course[] = [];
  public displayedColumns = ['name', 'category'];

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog
  ) {

    // this.courses = this.coursesService.list();
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.')
        return of([])
      })
    )
  }

  public onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  public ngOnInit(): void {
    // this.courses = this.coursesService.list();
  }

}
