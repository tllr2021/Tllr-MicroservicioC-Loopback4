import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {PostalesDataSource} from '../datasources';
import {Postales as PostalesModel} from "../models/postales.model";

export interface Postales {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getZona(codigoPostal: number): Promise<PostalesModel[]>
}

export class PostalesProvider implements Provider<Postales> {
  constructor(
    // postales must match the name property in the datasource json file
    @inject('datasources.postales')
    protected dataSource: PostalesDataSource = new PostalesDataSource(),
  ) {}

  value(): Promise<Postales> {
    return getService(this.dataSource);
  }
}
