import {
  Filter, repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param, response
} from '@loopback/rest';
import {Postales} from '../models';
import {PostalesRepository} from '../repositories';

export class PostalesController {
  constructor(
    @repository(PostalesRepository)
    public postalesRepository: PostalesRepository,
  ) { }

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
}
