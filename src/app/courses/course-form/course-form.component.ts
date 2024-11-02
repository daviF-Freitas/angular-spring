import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AppMaterialModule,
    SharedModule,
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      name: [''],
      category: ['']
    })
  }

  public onSubmit(){
    this.service.save(this.form.value).subscribe({
      next: (result) => console.log(result),
      error: (error) => this.onError()
    })
  }

  public onCancel(){}

  private onError() {
    this.snackBar.open('Erro ao Salvar', '', { duration: 5000 });
  }
}
