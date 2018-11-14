import { Injectable } from '@angular/core';
import { Observable, Subject  } from 'rxjs';

@Injectable()
export class ExceptionService {
    private subject = new Subject<any>();
 
    sendException(status: string) {
        this.subject.next(status);
    }
 
    clearException() {
        this.subject.next();
    }
 
    getException(): Observable<any> {
        return this.subject.asObservable();
    }
}