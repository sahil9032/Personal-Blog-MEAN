import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
        role: 'user'
      };
      this.authService.create(User).subscribe(data => {
        if (data._id === '-1') {
          window.alert('Please check email and password.');
        } else {
          window.alert('Registration sucessfull.');
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('id', data.name);
          localStorage.setItem('role', data.role);
          this.router.navigate(['/index']).then(() => {
            window.location.reload();
          });
        }
      });
    }
  }

}
