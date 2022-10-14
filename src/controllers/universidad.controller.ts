import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Universidad} from '../models';
import {UniversidadRepository} from '../repositories';

export class UniversidadController {
  constructor(
    @repository(UniversidadRepository)
    public universidadRepository : UniversidadRepository,
  ) {}

  @post('/universidads')
  @response(200, {
    description: 'Universidad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Universidad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Universidad, {
            title: 'NewUniversidad',
            exclude: ['id'],
          }),
        },
      },
    })
    universidad: Omit<Universidad, 'id'>,
  ): Promise<Universidad> {
    return this.universidadRepository.create(universidad);
  }

  @get('/universidads/count')
  @response(200, {
    description: 'Universidad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Universidad) where?: Where<Universidad>,
  ): Promise<Count> {
    return this.universidadRepository.count(where);
  }

  @get('/universidads')
  @response(200, {
    description: 'Array of Universidad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Universidad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Universidad) filter?: Filter<Universidad>,
  ): Promise<Universidad[]> {
    return this.universidadRepository.find(filter);
  }

  @patch('/universidads')
  @response(200, {
    description: 'Universidad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Universidad, {partial: true}),
        },
      },
    })
    universidad: Universidad,
    @param.where(Universidad) where?: Where<Universidad>,
  ): Promise<Count> {
    return this.universidadRepository.updateAll(universidad, where);
  }

  @get('/universidads/{id}')
  @response(200, {
    description: 'Universidad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Universidad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Universidad, {exclude: 'where'}) filter?: FilterExcludingWhere<Universidad>
  ): Promise<Universidad> {
    return this.universidadRepository.findById(id, filter);
  }

  @patch('/universidads/{id}')
  @response(204, {
    description: 'Universidad PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Universidad, {partial: true}),
        },
      },
    })
    universidad: Universidad,
  ): Promise<void> {
    await this.universidadRepository.updateById(id, universidad);
  }

  @put('/universidads/{id}')
  @response(204, {
    description: 'Universidad PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() universidad: Universidad,
  ): Promise<void> {
    await this.universidadRepository.replaceById(id, universidad);
  }

  @del('/universidads/{id}')
  @response(204, {
    description: 'Universidad DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.universidadRepository.deleteById(id);
  }
}
