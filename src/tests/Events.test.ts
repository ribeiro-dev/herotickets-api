import request from 'supertest';
import path from 'path';
import { App } from '../app';

const app = new App().app;

describe('Event test', () => {

   it('/POST Event', async () => {
      const event = {
         title: "Jorge e Matheus",
         price: [{sector: 'Pista', amount: '20'}],
         categories: ['Show'],
         description: 'Evento descrição',
         city: 'Belo Horizonte',
         location: {
            latitude: '-19.8658659',
            longitude: '-43.9737064'
         }, 
         coupons: [],
         date: new Date(),
         participants: [],
      };

      const response = await request(app)
         .post('/events')
         .field('title', event.title)
         .field('description', event.description)
         .field('city', event.city)
         .field('coupons', event.coupons)
         .field('categories', event.categories)
         .field('location[latitude]', event.location.latitude)
         .field('location[longitude]', event.location.longitude)
         .field('price[sector]', event.price[0].sector)
         .field('price[amount]', event.price[0].amount)
         .attach('banner', path.resolve(__dirname, '..', '..', '..', 'Jorge-e-Matheus-banner.png')) // attach files to the request;
         .attach('flyers', path.resolve(__dirname, '..', '..', '..', 'Jorge-e-Matheus-flyer-1.jpeg')) // attach files to the request;
         .attach('flyers', path.resolve(__dirname, '..', '..', '..', 'Jorge-e-Matheus-flyer-2.jpeg')) // attach files to the request;

         if (response.error) {
            console.log(response.error);
         }

         expect(response.status).toBe(201);
         expect(response.body).toEqual({message: 'Evento criado com sucesso'});
   })
})