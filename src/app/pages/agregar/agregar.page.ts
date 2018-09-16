import { Component } from '@angular/core';
import { Tarea, TareasService } from '../../services/tareas.service';
import { NavController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-agregar',
  templateUrl: 'agregar.page.html',
})

export class AgregarPage {

  public tareas: Tarea[] = [];

  constructor(
    public navCtrl: NavController,
    public tareasService: TareasService,
    public firestore: AngularFirestore,
    public loadingController: LoadingController
  ) { }

  async agregarTarea(tarea: HTMLElement) {
    if (tarea['value'] === '') {
      return null;
    }

    const x = await this.presentLoadingWithOptions();
    x.present();

    const id = this.firestore.createId();
    const nuevaTarea = { id , data: {tarea: tarea['value'], completada: false} };

    this.tareas.push(nuevaTarea);
    this.tareasService.agregarTarea(nuevaTarea)
      .then(() => x.dismiss());

    tarea['value'] = '';
  }

  regresar() {
    this.navCtrl.navigateBack('home');
  }

  async eliminarTarea(id) {
    const x = await this.presentLoadingWithOptions();
    x.present();

    this.tareas.splice(this.tareas.indexOf(id), 1);
    this.tareasService.elimimarTarea(id)
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
