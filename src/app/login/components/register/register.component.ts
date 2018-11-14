import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();

  @ViewChild('username') usernameInput: ElementRef;

  registerForm: FormGroup;
  passwordsForm: FormGroup;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      mail: ['', [Validators.required, Validators.email]],

      passwords: this.formBuilder.group({
        password: ['', []],
        password2: ['', []],
      }, { validator: [this.passwordConfirmed, this.passFormat] })

    });
  }

  checkUniqueUsername(value: string) {
    if (this.f.username.errors || !this.f.username.touched) {
        return;
    }

    this.authenticationService.isUniqueUsername(value).subscribe(
      data => {
        if (!data) {
          this.f.username.setErrors({repeat: true});
        }
      },
      error => {
        this.router.navigate(['/login']);
        this.close.emit();
      }
    )
  }

  passwordConfirmed(c: AbstractControl): { mismatch: boolean } {
    if (c.get('password').value !== c.get('password2').value) {
      return { mismatch: true };
    }
  }

  passFormat(c: AbstractControl): { passFormat: boolean } {
    let length = c.get('password').value.length;
    if (length < 4)
      return { passFormat: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  register() {
    const me = this;
    this.submitted = true;

    if (this.registerForm.invalid)
      return;


    const newUser = {
      username: this.f.username.value,
      password: this.f.passwords.get('password').value,
      mail: this.f.mail.value
    };

    this.authenticationService.register(newUser).subscribe(data => {
      me.authenticationService.login(data.username, data.password).subscribe(data => {
        me.router.navigate(['/home'])
        me.close.emit();
      },
      error => {
        this.router.navigate(['/login'])
      }
      );
    }
    );
  }



}
