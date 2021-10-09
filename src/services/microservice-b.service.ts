import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {MicroserviceBDataSource} from '../datasources';

export interface MicroserviceB {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.

  //Functions defined in .datasource
  //functionName(arg(s): datatype) : Promise<object>
}

export class MicroserviceBProvider implements Provider<MicroserviceB> {
  constructor(
    // microserviceB must match the name property in the datasource json file
    @inject('datasources.microserviceB')
    protected dataSource: MicroserviceBDataSource = new MicroserviceBDataSource(),
  ) {}

  value(): Promise<MicroserviceB> {
    return getService(this.dataSource);
  }
}
