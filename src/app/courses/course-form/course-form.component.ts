import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';

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
export class CourseFormComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      _id: [''],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      category: ['', [Validators.required]]
    })
  }

  public ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];

    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    });
  }

  public onSubmit(){
    this.service.save(this.form.value).subscribe({
      next: (result) => this.onSuccess(),
      error: (error) => this.onError()
    })
  }

  public onCancel(): void {
    this.location.back();
  }

  private onSuccess(): void {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
  }

  private onError(): void {
    this.snackBar.open('Erro ao Salvar', '', { duration: 5000 });
  }

  public getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);

    if(field?.hasError('required')) {
      return 'Campo obrigatório!';
    }

    if(field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 4;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if(field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 20;
      return `Tamanho máximo é de ${requiredLength} caracteres.`;
    }

    return 'Campo Inválido.';

  }
}
