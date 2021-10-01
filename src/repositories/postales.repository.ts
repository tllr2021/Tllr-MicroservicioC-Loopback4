import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Postales, PostalesRelations} from '../models';

export class PostalesRepository extends DefaultCrudRepository<
  Postales,
  typeof Postales.prototype._id,
  PostalesRelations
> {
  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource,
  ) {
    super(Postales, dataSource);
  }
}
