import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'microserviceB',
  connector: 'rest',
  baseURL: '', //ngrock microservice B
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: '', //baseUrl/path{arg(s)}
      },
      functions: {
        //functionName: ['arg(s)']--↑
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MicroserviceBDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'microserviceB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.microserviceB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
