import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';
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
    private navCtrl: NavController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    if(this.authenticationService.getStatus) {
      this.navCtrl.navigateRoot('/main');
    }
  }
  loginWithGoogle() {
    this.authenticationService.loginWithGoogle()
     .then((data) => {
      this.navCtrl.navigateRoot('/main');
      }).catch((err) => console.log(err));

  }
  loginWithTwitter() {
    console.log('exito');
  }
  loginWithEmail() {
    this.authenticationService.loginWithEmail(this.email, this.password).then( (data) => {
      this.navCtrl.navigateRoot('/main');
    }
    ).catch((error) => {
     this.alertMessage('ERROR', 'Correo o password incorrecto, intente nuevamente');
    });
  }
  register(){
    this.authenticationService.registerWithEmail(this.email, this.password).then(
      (data) => {
        const user  =  {
          uid: data.user.uid,
          email: this.email,
          nick: this.nick
        };
        this.userService.createUser(user).then(
          (data2) => {
            this.alertMessage('Registro Exitoso', 'ya puede acceder');
            this.operation = 'login';
          }
        ).catch((error) => {
          this.alertMessage('ERROR', 'Ocurrio un error, intente nuevamente');
          console.log(error);
        });
      }
    ).catch((error) => {
      alert('Ocurrio un error');
      console.log(error);
    });
  }
  async alertMessage(title: string, msg: string, css: string = 'alertDanger') {
    const  alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: [{
       text: 'Cerrar',
       cssClass: 'danger'
      }]
    });

    await alert.present();
  }
}
