import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Proyecto,
  Estudiante,
} from '../models';
import {ProyectoRepository} from '../repositories';

export class ProyectoEstudianteController {
  constructor(
    @repository(ProyectoRepository)
    public proyectoRepository: ProyectoRepository,
  ) { }

  @get('/proyectos/{id}/estudiante', {
    responses: {
      '200': {
        description: 'Estudiante belonging to Proyecto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estudiante)},
          },
        },
      },
    },
  })
  async getEstudiante(
    @param.path.string('id') id: typeof Proyecto.prototype.id,
  ): Promise<Estudiante> {
    return this.proyectoRepository.estudiante(id);
  }
}
