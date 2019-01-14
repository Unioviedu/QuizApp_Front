import { Component } from '@angular/core';
import { ExceptionService } from './shared/services/exception.service';
import { Subscription } from 'rxjs';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  status: any;
  subscription: Subscription;
  title = 'quizwebapp';

  alertException: boolean;

  private serverUrl = 'http://localhost:8080/socket'
  private stompClient;

  constructor(private exceptionService: ExceptionService) {
    this.subscription = this.exceptionService
      .getException()
      .subscribe(status => {
        if (status != 400) {
          var me = this;
          this.status = status;
          this.alertException = true;

          setTimeout(function() { 
            me.alertException = false; 
          }, 4000);
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
