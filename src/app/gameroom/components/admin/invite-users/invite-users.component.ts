import { Component, OnInit, Input } from '@angular/core';
import { GameRoomService } from '../../../services/GameRoomService';

@Component({
  selector: 'app-invite-users',
  templateUrl: './invite-users.component.html',
  styleUrls: ['./invite-users.component.css']
})
export class InviteUsersComponent implements OnInit {
  @Input() idRoom: string;

  usersForInvite = [];
  users = [];

  searchValue = "";

  constructor(private gameRoomService: GameRoomService) { }

  ngOnInit() {
    
  }

  searchUsers(username) {
    var me = this;
    if (username == "") {
      this.users = this.usersForInvite;
      return;
    }

    this.gameRoomService.findUserByName(username).subscribe(
      data => {
        me.users = data;
      }
    )
  }

  addUserToInvite(user) {
    this.usersForInvite.push(user);
    this.users = this.usersForInvite;
    this.searchValue = '';
  }

  inviteUsers() {
    var room = {
      id: this.idRoom,
      users: this.usersForInvite.map(u => u.username)
    };

    this.gameRoomService.inviteUser(room).subscribe(
      data => {

      }
    )
  }

}
