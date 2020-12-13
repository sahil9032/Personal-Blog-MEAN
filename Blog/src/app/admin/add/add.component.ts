import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public userForm: FormGroup;
  public message: string;

  constructor(private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  checkPasswords(group: FormGroup): any {
    return group.get('password') === group.get('confirmPassword') ? null : {valid: false};
  }

  addUser(): void {
    if (this.userForm.invalid) {
      return;
    } else {
      const User = {
        email: this.userForm.controls.email.value,
        password: this.userForm.controls.password.value,
        name: this.userForm.controls.name.value,
        role: 'admin'
      };
      this.authService.create(User).subscribe(data => {
        const userModel = data;
        if (userModel._id === '-1') {
          window.alert('Please check email and password.');
        } else {
          window.alert('User added sucessfully.');
        }
      });
    }
  }

}
