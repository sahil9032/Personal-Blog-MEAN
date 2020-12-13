import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class ClientHeaderComponent implements OnInit {

  public isLoggedIn = false;
  public id: string;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' &&
      localStorage.getItem('role') === 'user';
    this.id = localStorage.getItem('id');
  }

  public logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
