import { Component } from '@angular/core';
import { Tarea, TareasService } from '../../services/tareas.service';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
})
export class HomePage {

  public tareas: Tarea[] = [];
  public verTareas: String = 'todas';

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public tareasService: TareasService,
    public firestore: AngularFirestore,
    public loadingController: LoadingController
  ) {
    this.obtenerTareas();
  }

  async obtenerTareas() {
    const x = await this.presentLoadingWithOptions();
    x.present();


    this.tareasService.obtenerTareas()
      .subscribe(res => {
        this.tareas = [];

        res.forEach((data: any) => {
          this.tareas.push({
            id: data.payload.doc.id,
            data: data.payload.doc.data()
          });

          x.dismiss();
        });
      });
  }

  agregar() {
    this.navCtrl.navigateForward('agregar');
  }

  async eliminarTarea(id) {
    const x = await this.presentLoadingWithOptions();
    x.present();

    this.tareasService.elimimarTarea(id)
      .then(() => x.dismiss());
  }

  async completar(tarea) {
    const x = await this.presentLoadingWithOptions();
    x.present();

    tarea.data.completada = !tarea.data.completada;

    this.tareasService.completarTarea(tarea)
      .then(() => x.dismiss());
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'hide',
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading;
  }
}
