import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterEvent, RouterStateSnapshot } from '@angular/router';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';
import { CoursesService } from '../services/courses.service';

export class courseResolver implements Resolve<Course> {

  constructor(private serviceCourse: CoursesService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    if(route.params && route.params['id']){
      return this.serviceCourse.searchById(route.params['id']);
    }
    return of ({
      _id: '',
      name: '',
      category: ''
    });
  }
};
