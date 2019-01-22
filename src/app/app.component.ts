import { Component } from '@angular/core';
import { ExceptionService } from './shared/services/exception.service';
import { Subscription } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, NavigationStart } from '@angular/router';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  status: any;
  subscription: Subscription;
  subscriptionReq: Subscription;
  subscriptionRes: Subscription;

  title = 'quizwebapp';

  alertException: boolean;

  private serverUrl = 'http://localhost:8080/socket'
  private stompClient;

  constructor(private exceptionService: ExceptionService, private spinnerService: Ng4LoadingSpinnerService,
    private router: Router) {
      router.events.subscribe(event => {
        if(event instanceof NavigationStart) {
          this.alertException = false;
        }
      });

    this.subscription = this.exceptionService
      .getException()
      .subscribe(status => {
        this.spinnerService.hide();
        if (status != 400) {
          this.router.navigate(['']);
          var me = this;
          this.status = status;
          this.alertException = true;
        }
      });

      this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(){
    /*let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/edu", (message) => {
        debugger
        alert(message);
      });
    });*/
  }

  closeException() {
    this.alertException = false;
  }
}
