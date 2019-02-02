import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:any;

  constructor(private homeService: HomeService) { 
    
  }

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    let me = this;

    this.homeService.findAllNotifications().subscribe(
      user => {
        me.user = user;
      }
    );
  }

  acceptInvitation(notification) {
    let me = this;

    this.homeService.addUserToRoom(notification.extraInfo['idRoom']).subscribe(
      data => {
        me.removeNotification(notification);
      }
    );
  }

  removeNotification(notification) {
    let me = this;

    this.homeService.removeNotification(notification.id).subscribe(
      data => {
        me.loadNotifications();
      }
    );


  }

}
