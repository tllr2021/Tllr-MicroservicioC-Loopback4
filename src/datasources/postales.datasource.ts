import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'postales',
  connector: 'rest',
  baseURL: 'localhost',
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
        url: 'http://localhost:3000/postales?filter=%7B%0A%20%20%22limit%22%3A%201%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22d_codigo%22%3A%20{codigoPostal}%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22c_zona%22%3A%20true%0A%20%20%7D%0A%7D',
      },
      functions: {
        getZona: ['codigoPostal']
      },
    },
  ]
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PostalesDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'postales';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.postales', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
