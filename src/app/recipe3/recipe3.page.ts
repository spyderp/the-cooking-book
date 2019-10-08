import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeInterface } from '../interfaces/recipe';
import { ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Admob, AdmobOptions } from '@ionic-native/admob/ngx';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-recipe3',
  templateUrl: './recipe3.page.html',
  styleUrls: ['./recipe3.page.scss'],
})
export class Recipe3Page implements OnInit {
  recipe: RecipeInterface;
  pictureUrl: any = null;
  croppedImage: any;
  constructor(
    public toastController: ToastController,
    private admob: Admob,
    private camera: Camera,
    private recipeService: RecipeService,
    private firebaseStorage: AngularFireStorage,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    const admobOptions: AdmobOptions = {
      publisherId: environment.admob.adModId,
      interstitialAdId: environment.admob.intersticialId,
      isTesting: true,
      autoShowBanner: false,
      autoShowInterstitial: false,
    };
    this.admob.setOptions(admobOptions)
      .then(() => console.log('Admob options have been successfully set'))
      .catch(err => console.error('Error setting admob options:', err));
  }

  ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('uid');
    if (!recipeId) {
      this.router.navigate(['/main']);
    } else {
      this.recipeService.getById(recipeId).valueChanges().subscribe( (data: RecipeInterface) => {
        this.recipe = data;
        if (data.picture && data.picture.length > 0) {
          this.pictureUrl = data.picture;
        }
      }, (e) => {
        console.log(e);
      });
    }
  }
  submit(next = 'save') {
    let save = true;
    if (this.croppedImage) {
      const pictures = this.firebaseStorage.ref('pictures/' + this.recipe.uid + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then((result) => {
        const picture = this.firebaseStorage.ref('pictures/' + this.recipe.uid + '.jpg').getDownloadURL();
        picture.subscribe( p => {
          this.recipe.picture = p;
          this.recipeService.create(this.recipe).then(data => {
            this.msgToast('Datos guardardos');
          }).catch(e => {
            save = false;
            this.msgToast('ERROR: No se pudieron guardar los datos intente nuevamente', 'danger');
          });
          if (save) {
            if (next === 'save') {
              this.admob.requestInterstitialAd().then(() => console.log('Interstitial ad loaded'))
           .catch(err => {
              console.error('Error loading interstitial ad:', err);
                this.router.navigate(['/main']);
              });
              this.admob.onAdClosed().subscribe(() => {
                console.log('Interstitial ad closed');
                this.router.navigate(['/main']);
              });
            } else if (next === 'prev') {
              this.router.navigate(['/recipe2', this.recipe.uid]);
            }
          }
        });
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.msgToast('Datos guardardos');
      if (save) {
        if (next === 'save') {
           this.admob.requestInterstitialAd().then(() => console.log('Interstitial ad loaded'))
           .catch(err => {
             console.error('Error loading interstitial ad:', err);
             this.router.navigate(['/main']);
            });
           this.admob.onAdClosed().subscribe(() => {
             console.log('Interstitial ad closed');
             this.router.navigate(['/main']);
           });
        } else if (next === 'prev') {
          this.router.navigate(['/recipe2', this.recipe.uid]);
        }
      }
    }
  }
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.croppedImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    });
  }


  async msgToast(msg, c = 'success') {
    const toast = await this.toastController.create({
      message: msg,
      color: c,
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }
}
