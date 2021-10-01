import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Postales} from '../models';
import {PostalesRepository} from '../repositories';

export class PostalesController {
  constructor(
    @repository(PostalesRepository)
    public postalesRepository : PostalesRepository,
  ) {}

  @post('/postales')
  @response(200, {
    description: 'Postales model instance',
    content: {'application/json': {schema: getModelSchemaRef(Postales)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Postales, {
            title: 'NewPostales',
            exclude: ['_id'],
          }),
        },
      },
    })
    postales: Omit<Postales, '_id'>,
  ): Promise<Postales> {
    return this.postalesRepository.create(postales);
  }

  @get('/postales/count')
  @response(200, {
    description: 'Postales model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Postales) where?: Where<Postales>,
  ): Promise<Count> {
    return this.postalesRepository.count(where);
  }

  @get('/postales')
  @response(200, {
    description: 'Array of Postales model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Postales, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Postales) filter?: Filter<Postales>,
  ): Promise<Postales[]> {
    return this.postalesRepository.find(filter);
  }

  @patch('/postales')
  @response(200, {
    description: 'Postales PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Postales, {partial: true}),
        },
      },
    })
    postales: Postales,
    @param.where(Postales) where?: Where<Postales>,
  ): Promise<Count> {
    return this.postalesRepository.updateAll(postales, where);
  }

  @get('/postales/{id}')
  @response(200, {
    description: 'Postales model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Postales, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Postales, {exclude: 'where'}) filter?: FilterExcludingWhere<Postales>
  ): Promise<Postales> {
    return this.postalesRepository.findById(id, filter);
  }

  @patch('/postales/{id}')
  @response(204, {
    description: 'Postales PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Postales, {partial: true}),
        },
      },
    })
    postales: Postales,
  ): Promise<void> {
    await this.postalesRepository.updateById(id, postales);
  }

  @put('/postales/{id}')
  @response(204, {
    description: 'Postales PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() postales: Postales,
  ): Promise<void> {
    await this.postalesRepository.replaceById(id, postales);
  }

  @del('/postales/{id}')
  @response(204, {
    description: 'Postales DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.postalesRepository.deleteById(id);
  }
}
