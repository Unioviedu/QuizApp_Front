import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameRoomService } from '../../../services/GameRoomService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  submitted: boolean;
  roomForm: FormGroup;

  @Output() newRoomEvent: EventEmitter<any>;

  constructor(private formBuilder: FormBuilder,
    private gameRoomService: GameRoomService,
    private router: Router) {
      this.newRoomEvent = new EventEmitter<any>();
    }

  ngOnInit() {
    this.roomForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(32)]],
      description: ['', [Validators.required]]
    });

  }

  get form() {
    return this.roomForm.controls;
  }

  create() {
    const me = this;
    this.submitted = true;

    if (this.roomForm.invalid)
      return;


    const newRoom = {
      title: this.form.title.value,
      description: this.form.description.value
    };

    this.gameRoomService.createNewGameRoom(newRoom).subscribe(
      data => {
        me.newRoomEvent.emit();
      }
    );
  }

}
