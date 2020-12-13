import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public message: string;

  constructor(private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.logout();
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    } else {
      const User = {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      };
      this.authService.login(User).subscribe(data => {
        const userModel = data;
        if (userModel._id === '-1') {
          this.message = 'Please check your userid and password';
        } else {
          console.log('Login successful');
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('id', userModel.name);
          localStorage.setItem('role', userModel.role);
          if (userModel.role === 'admin') {
            this.router.navigate(['admin/index']);
          } else {
            this.router.navigate(['/index']).then(() => {
              window.location.reload();
            });
          }
        }
      });
    }
  }
}
