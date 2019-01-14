import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notifications = [];

  constructor(private homeService: HomeService) { 
    
  }

  ngOnInit() {
    var me = this;

    this.homeService.findAllNotifications().subscribe(
      user => {
        me.notifications = user.notifications;
      }
    )
  }

  acceptInvitation(notification) {
    this.homeService.addUserToRoom(notification.extraInfo['idRoom']).subscribe(
      data => {
        
      }
    );
  }

}
