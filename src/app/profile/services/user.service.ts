import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    url: string;

    constructor(private http: HttpClient) {
        this.url = environment.baseUrl;
    }

    getUser() {
        return this.http.get<any>(`${this.url}/user?username=${ this.getCurrentUser() }`);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser')).username;
    }

    getQuestionByUser() {
        return this.http.get<any>(`${this.url}/questionsByUser?username=${ this.getCurrentUser()}`);
    }

}