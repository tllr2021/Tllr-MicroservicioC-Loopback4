import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: false,
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
    type: 'number',

  })
  c_zona: number;


  constructor(data?: Partial<Postales>) {
    super(data);
  }
}

export interface PostalesRelations {
  // describe navigational properties here
}

export type PostalesWithRelations = Postales & PostalesRelations;
