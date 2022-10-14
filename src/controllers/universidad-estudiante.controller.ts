import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Universidad,
  Estudiante,
} from '../models';
import {UniversidadRepository} from '../repositories';

export class UniversidadEstudianteController {
  constructor(
    @repository(UniversidadRepository)
    public universidadRepository: UniversidadRepository,
  ) { }

  @get('/universidads/{id}/estudiante', {
    responses: {
      '200': {
        description: 'Estudiante belonging to Universidad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estudiante)},
          },
        },
      },
    },
  })
  async getEstudiante(
    @param.path.string('id') id: typeof Universidad.prototype.id,
  ): Promise<Estudiante> {
    return this.universidadRepository.estudiante(id);
  }
}
