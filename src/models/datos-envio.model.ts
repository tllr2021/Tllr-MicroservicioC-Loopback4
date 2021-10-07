import {Model, model, property} from '@loopback/repository';

@model()
export class DatosEnvio extends Model {
  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  metodosPago: string;

  @property({
    type: 'string',
    required: true,
  })
  cupon: string;

  @property({
    type: 'number',
    required: true,
  })
  subtotal: number;

  @property({
    type: 'string',
    required: true,
  })
  peso: string;

  @property({
    type: 'string',
    required: true,
  })
  codigoPostal: string;


  constructor(data?: Partial<DatosEnvio>) {
    super(data);
  }
}

export interface DatosEnvioRelations {
  // describe navigational properties here
}

export type DatosEnvioWithRelations = DatosEnvio & DatosEnvioRelations;
