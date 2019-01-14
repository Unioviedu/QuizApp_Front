import { Injectable, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

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

    createNewExam(exam: any) {
      return this.http.post<any>(`${this.url}/newExam`, exam);
    }

    findRoomsByAdmin() {
      return this.http.get<any>(`${this.url}/findRoomsByAdmin/?admin=${this.getCurrentUser()}`);
    }

    findRoomsByUser() {
      return this.http.get<any>(`${this.url}/findRoomsByUser/?username=${this.getCurrentUser()}`);
    }

    findRoomById(id: string) {
      return this.http.get<any>(`${this.url}/findById/?id=${id}`);
    }

    findExamById(id: string) {
      return this.http.get<any>(`${this.url}/findExamById/?id=${id}`);
    }

    addResultExam(calification: any) {
      calification.username = this.getCurrentUser();
      return this.http.post<any>(`${this.url}/addResultExam/`, calification);
    }

    inviteUser(data) {
      return this.http.post<any>(`${this.url}/inviteUsersToRoom`, data);
    }

    findUserByName(username) {
      return this.http.get<any>(`${this.url}/findByUsername/?username=${username}`);
    }
  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('currentUser')).username;
    }
  
  }
  