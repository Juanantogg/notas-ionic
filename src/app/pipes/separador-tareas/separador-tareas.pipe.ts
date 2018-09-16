import { Pipe, PipeTransform } from '@angular/core';
import { Tarea } from '../../services/tareas.service';

@Pipe({
  name: 'separadorTareas',
  pure: false
})
export class SeparadorTareasPipe implements PipeTransform {

  transform(tareas: Tarea[], cual: String) {

    // console.log('pipe', tareas)

    let notasSeleccionadas: Tarea[] = [];

    switch (cual) {
      case 'pendientes':
        notasSeleccionadas = tareas.filter((nota) => {
          return !nota.data.completada;
        });
        break;
      case 'completadas':
        notasSeleccionadas = tareas.filter((nota) => {
          return nota.data.completada;
        });
        break;
      default:
        notasSeleccionadas = tareas;
        break;
    }

    return notasSeleccionadas;
  }
}
