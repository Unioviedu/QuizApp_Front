import { Component } from '@angular/core';
import { ExceptionService } from './shared/services/exception.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  status: any;
  subscription: Subscription;
  title = 'quizwebapp';

  alertException: boolean;

  constructor(private exceptionService: ExceptionService) {
    this.subscription = this.exceptionService
      .getException()
      .subscribe(status => {
        if (status != 400) {
          this.status = status;
          this.alertException = true;
        }
      });
  }

  closeException() {
    this.alertException = false;
  }
}
