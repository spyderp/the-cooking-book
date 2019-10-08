import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import {  ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  operation = 'login';
  email: string = null;
  password: string = null;
  nick: string = null;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    if (this.authenticationService.getStatus()) {
      this.router.navigate(['main']);
    }
  }
  loginWithGoogle() {
    this.authenticationService.loginWithGoogle()
     .then((data) => {
      localStorage.setItem('userId', data.user.uid);
      this.router.navigate(['main']);
      }).catch((err) => console.log(err));

  }
  loginWithTwitter() {
    console.log('exito');
  }
  loginWithEmail() {
    this.authenticationService.loginWithEmail(this.email, this.password).then( (data) => {
      localStorage.setItem('userId', data.user.uid);
      this.router.navigate(['main']);
    }
    ).catch((error) => {
     this.presentToast('ERROR: Correo o password incorrecto, intente nuevamente', 'danger');
    });
  }
  register() {
    this.authenticationService.registerWithEmail(this.email, this.password).then(
      (data) => {
        const user  =  {
          uid: data.user.uid,
          email: this.email,
          nick: this.nick
        };
        this.userService.createUser(user).then(
          (data2) => {
            this.presentToast('Registro Exitoso: ya puede acceder');
            this.operation = 'login';
          }
        ).catch((error) => {
          this.presentToast('ERROR: Ocurrio un error, intente nuevamente', 'danger');
          console.log(error);
        });
      }
    ).catch((error) => {
      alert('Ocurrio un error');
      console.log(error);
    });
  }
  async presentToast(msg, c = 'success') {
    const toast = await this.toastController.create({
      message: msg,
      color: c,
      duration: 2000
    });
    toast.present();
  }
}
