import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    // model definition goes in here
    mongodb: {collection: "postales"},
  },
})


export class Postales extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'number',

  })
  d_codigo: number;

  @property({
    type: 'string',
  })
  d_asenta?: string;

  @property({
    type: 'string',

  })
  d_tipo_asenta: string;

  @property({
    type: 'string',

  })
  D_mnpio: string;

  @property({
    type: 'string',

  })
  d_estado: string;

  @property({
    type: 'string',

  })
  d_ciudad: string;

  @property({
    type: 'number',

  })
  d_CP: number;

  @property({
    type: 'number',
    required: true,
  })
  c_estado: number;

  @property({
    type: 'number',

  })
  c_oficina: number;

  @property({
    type: 'string',

  })
  c_CP: string;

  @property({
    type: 'number',

  })
  c_tipo_asenta: number;

  @property({
    type: 'number',

  })
  c_mnpio: number;

  @property({
    type: 'number',

  })
  id_asenta_cpcons: number;

  @property({
    type: 'string',

  })
  d_zona: string;

  @property({
    type: 'string',

  })
  c_cve_ciudad: string;


  constructor(data?: Partial<Postales>) {
    super(data);
  }
}

export interface PostalesRelations {
  // describe navigational properties here
}

export type PostalesWithRelations = Postales & PostalesRelations;
