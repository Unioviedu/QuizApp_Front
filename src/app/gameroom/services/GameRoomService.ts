import { Injectable, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class GameRoomService {
    url: string;
  
    constructor(private http: HttpClient) {
      this.url = environment.baseUrl;
    }

    createNewGameRoom(room: any) {
        room.admin = this.getCurrentUser();
        return this.http.post<any>(`${this.url}/newGameRoom`, room);
    }

    findRoomsByAdmin() {
      return this.http.get<any>(`${this.url}/findByAdmin/?admin=${this.getCurrentUser()}`);
    }
  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('currentUser')).username;
    }
  
  }
  