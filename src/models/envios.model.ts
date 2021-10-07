import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Envios extends Model {
  @property({
    type: 'number',
    required: true,
  })
  precioEnvio: number;

  @property({
    type: 'object',
    required: true,
  })
  descuentos: object;

  @property({
    type: 'string',
    required: true,
  })
  tiempoEnvio: String;

  @property({
    type: 'number',
    required: true,
  })
  zona: Number;

  constructor(data?: Partial<Envios>) {
    super(data);
  }
}

export interface EnviosRelations {
  // describe navigational properties here
}

export type EnviosWithRelations = Envios & EnviosRelations;
