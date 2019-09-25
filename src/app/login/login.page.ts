import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authenticationService:AuthenticationService, private router: Router) { }

  ngOnInit() {
  }
  loginWithGoogle() {
    this.authenticationService.loginWithGoogle()
     .then((data) => {
        alert('Logeado correctamente');
      }).catch((err) => console.log(err));

  }
}
