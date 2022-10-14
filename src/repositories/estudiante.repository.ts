import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoproDataSource} from '../datasources';
import {Estudiante, EstudianteRelations, Proyecto} from '../models';
import {ProyectoRepository} from './proyecto.repository';

export class EstudianteRepository extends DefaultCrudRepository<
  Estudiante,
  typeof Estudiante.prototype.id,
  EstudianteRelations
> {

  public readonly proyectos: HasManyRepositoryFactory<Proyecto, typeof Estudiante.prototype.id>;

  constructor(
    @inject('datasources.mongopro') dataSource: MongoproDataSource, @repository.getter('ProyectoRepository') protected proyectoRepositoryGetter: Getter<ProyectoRepository>,
  ) {
    super(Estudiante, dataSource);
    this.proyectos = this.createHasManyRepositoryFactoryFor('proyectos', proyectoRepositoryGetter,);
    this.registerInclusionResolver('proyectos', this.proyectos.inclusionResolver);
  }
}
