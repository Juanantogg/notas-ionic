import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface Tarea {
  id: string;
  data: {
    tarea: string;
    completada: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private tareas: Tarea[] = [];

  constructor(
    public firestore: AngularFirestore
  ) { }


  obtenerTareas() {
    return this.firestore.collection('tareas').snapshotChanges();
  }

  agregarTarea(tarea: Tarea) {
    return this.firestore.collection('tareas').doc(tarea.id).set(tarea.data);
  }

  elimimarTarea(id: string) {
    return this.firestore.collection('tareas').doc(id).delete();
  }

  completarTarea(tarea: Tarea) {
    return this.firestore.collection('tareas').doc(tarea.id).set(tarea.data);
  }
}
