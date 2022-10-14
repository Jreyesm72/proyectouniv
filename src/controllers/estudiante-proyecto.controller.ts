import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Estudiante,
  Proyecto,
} from '../models';
import {EstudianteRepository} from '../repositories';

export class EstudianteProyectoController {
  constructor(
    @repository(EstudianteRepository) protected estudianteRepository: EstudianteRepository,
  ) { }

  @get('/estudiantes/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Array of Estudiante has many Proyecto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proyecto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Proyecto>,
  ): Promise<Proyecto[]> {
    return this.estudianteRepository.proyectos(id).find(filter);
  }

  @post('/estudiantes/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Estudiante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proyecto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Estudiante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyecto, {
            title: 'NewProyectoInEstudiante',
            exclude: ['id'],
            optional: ['estudianteId']
          }),
        },
      },
    }) proyecto: Omit<Proyecto, 'id'>,
  ): Promise<Proyecto> {
    return this.estudianteRepository.proyectos(id).create(proyecto);
  }

  @patch('/estudiantes/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Estudiante.Proyecto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyecto, {partial: true}),
        },
      },
    })
    proyecto: Partial<Proyecto>,
    @param.query.object('where', getWhereSchemaFor(Proyecto)) where?: Where<Proyecto>,
  ): Promise<Count> {
    return this.estudianteRepository.proyectos(id).patch(proyecto, where);
  }

  @del('/estudiantes/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Estudiante.Proyecto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Proyecto)) where?: Where<Proyecto>,
  ): Promise<Count> {
    return this.estudianteRepository.proyectos(id).delete(where);
  }
}
