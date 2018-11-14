import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, EMPTY, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExceptionService } from '../../shared/services/exception.service';
 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private exceptionService: ExceptionService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let me = this;
        
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
 
        return next.handle(request).pipe(
            catchError( err => {
                    this.exceptionService.sendException(err.status);
                    return throwError(err);
            })
        );
    }
}