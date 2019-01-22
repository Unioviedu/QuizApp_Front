import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
  url: string;

  constructor(private http: HttpClient) {
      this.url = environment.baseUrl;
  }

  findAllNotifications() {
    return this.http.get<any>(`${this.url}/findAllNotifications/?username=${this.getCurrentUser()}`);
  }

  removeNotification(id) {
    return this.http.get<any>(`${this.url}/removeNotification/?username=${this.getCurrentUser()}&id=${id}`);
  }

  addUserToRoom(idRoom) {
    var room = {
      id: idRoom,
      users: [this.getCurrentUser()]
    }

    return this.http.post<any>(`${this.url}/addUserToRoom`, room);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')).username;
  }

}