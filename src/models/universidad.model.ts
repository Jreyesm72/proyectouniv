import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Estudiante} from './estudiante.model';

@model()
export class Universidad extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_entidad: string;

  @belongsTo(() => Estudiante)
  estudianteId: string;

  constructor(data?: Partial<Universidad>) {
    super(data);
  }
}

export interface UniversidadRelations {
  // describe navigational properties here
}

export type UniversidadWithRelations = Universidad & UniversidadRelations;
