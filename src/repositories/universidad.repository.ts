import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoproDataSource} from '../datasources';
import {Universidad, UniversidadRelations, Estudiante} from '../models';
import {EstudianteRepository} from './estudiante.repository';

export class UniversidadRepository extends DefaultCrudRepository<
  Universidad,
  typeof Universidad.prototype.id,
  UniversidadRelations
> {

  public readonly estudiante: BelongsToAccessor<Estudiante, typeof Universidad.prototype.id>;

  constructor(
    @inject('datasources.mongopro') dataSource: MongoproDataSource, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>,
  ) {
    super(Universidad, dataSource);
    this.estudiante = this.createBelongsToAccessorFor('estudiante', estudianteRepositoryGetter,);
    this.registerInclusionResolver('estudiante', this.estudiante.inclusionResolver);
  }
}
