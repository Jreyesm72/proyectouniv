import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoproDataSource} from '../datasources';
import {Proyecto, ProyectoRelations, Estudiante} from '../models';
import {EstudianteRepository} from './estudiante.repository';

export class ProyectoRepository extends DefaultCrudRepository<
  Proyecto,
  typeof Proyecto.prototype.id,
  ProyectoRelations
> {

  public readonly estudiante: BelongsToAccessor<Estudiante, typeof Proyecto.prototype.id>;

  constructor(
    @inject('datasources.mongopro') dataSource: MongoproDataSource, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>,
  ) {
    super(Proyecto, dataSource);
    this.estudiante = this.createBelongsToAccessorFor('estudiante', estudianteRepositoryGetter,);
    this.registerInclusionResolver('estudiante', this.estudiante.inclusionResolver);
  }
}
