import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  levelRank: any = {};
  trophies: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.userService.getUser().subscribe(
      data => {
        this.user = data;
        this.levelRank = data.levelRank;
        this.trophies = data.resultTrophies;

        this.levelRank.userExperience = this.user.experience;
      }
    );
  }

}
