import {inject} from "@loopback/core";
import {
  getModelSchemaRef, post, requestBody,
  response
} from '@loopback/rest';
import {DatosEnvio, Envios} from '../models';
import {Postales} from "../services/postales.service";
export class EnviosController {
  constructor(
    @inject('services.Postales')
    protected PostalesService: Postales
  ){}
  @post('/envios')
  @response(200, {
    description: 'Envio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Envios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosEnvio, {
            title: 'DatosEnvio',
          }),
        },
      },
    })
    datosEnvio: DatosEnvio,
  ): Promise<Envios> {
    let {c_zona: zona} = (await this.PostalesService.getZona(datosEnvio.codigoPostal))[0];

    let precioEnvio = -1;
    let preciosEnvio: number[] = [];
    let tiempoEnvio = "";
    let descuentos = {};

    switch(datosEnvio.peso){
      case "1":
        preciosEnvio = [22.89, 28.61, 31.19, 33.99, 37.05];
        break;
      case "2":
        preciosEnvio = [30.90, 35.77, 38.98, 42.49, 46.32];
        break;
      case "3":
        preciosEnvio = [38.63, 44.71, 48.73, 53.12, 57.90];
        break;
      case "4":
        preciosEnvio = [48.28, 55.88, 60.91, 66.40, 72.37];
        break;
      case "5":
        preciosEnvio = [60.35, 69.85, 76.14, 82.99, 90.46];
        break;
      case "6":
        preciosEnvio = [75.44, 87.32, 95.18, 103.74, 113.08];
        break;
      case "7":
        preciosEnvio = [94.30, 109.15, 118.97, 129.68, 141.35];
        break;
      case "8":
        preciosEnvio = [117.88, 136.44, 148.71, 162.10, 176.69];
        break;
      case "Extra":
        preciosEnvio = [20.36, 58.89, 86.99, 120.93, 306.89];
        break;
    }

    if(preciosEnvio.length && zona >= 1 && zona <= 5){
      precioEnvio = preciosEnvio[zona - 1];
    }

    switch(zona) {
      case 1:
      case 2:
      case 4:
        tiempoEnvio = "Siguiente Día Habil";
        break;
      case 3:
        tiempoEnvio = "2-3 Días";
        break;
      case 5:
        tiempoEnvio = "3 Días";
        break;
    }

    // Esto eventualmente se convertirá en una llamada al servicio del Microservicio B
    // Lo puse al final porque la llamada va a depender del precio de envio calculado
    descuentos = {tieneDescuento: true, porcentajeDescuentoE: 5, porcentajeDescuentoP: 10, cantidadDescontadaE: 5, cantidadDescontadaP: 5, nuevoTotal: 1000};

    return new Envios({descuentos, precioEnvio, tiempoEnvio, zona});
  }
}
