import request from 'supertest';
import path from 'path';
import { App } from '../app';
import { EventUseCase } from '../useCases/EventUseCase';
import crypto from 'node:crypto';

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
         .field('date', event.date.toISOString())
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
   it('/GET/:id Get event by id', async () => {
      const response = await request(app)
         .get('/events/64ea98e6ce38319d7d5d765a')

         if (response.error) {
            console.log("🚀 ~ file: Events.test.ts:69 ~ it ~ error:", response.error);
         }

      expect(response.status).toBe(200);
   })
   it('/GET Get events by location', async () => {
      const response = await request(app)
         .get('/events?latitude=-19.8658659&longitude=-43.9737064')

         if (response.error) {
            console.log("🚀 ~ file: Events.test.ts:69 ~ it ~ error:", response.error);
         }

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
   })
   it('/GET Get events by category', async () => {
      const response = await request(app)
         .get('/events/category/Show')

         if (response.error) {
            console.log("🚀 ~ file: Events.test.ts:69 ~ it ~ error:", response.error);
         }

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
   })
   it('/POST event insert user', async () => {
      const response = await request(app)
         .post('/events/64ebbedd19c5a9f3146edc2d/participants')
         .send({
            name: 'Ribeiro',
            email: crypto.randomBytes(20).toString('hex') + '@test.com',
         });

         if (response.error) {
            console.log("🚀 ~ file: Events.test.ts:69 ~ it ~ error:", response.error);
         }

      expect(response.status).toBe(200);
   })
});

const eventRepository = {
   add: jest.fn(),
   findEventsByCategory: jest.fn(),
   findByLocationAndDate: jest.fn(),
   findEventsByCity: jest.fn(),
   findEventsByName: jest.fn(),
   findEventById: jest.fn(),
   update: jest.fn()
};
const eventUseCase = new EventUseCase(eventRepository);
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
   banner: 'banner.png',
   flyers: ['flyer1.png', 'flyer2.png'],
   coupons: [],
   date: new Date(),
   participants: [],
};
describe('Unit test', () => {
   afterEach(() => {
      jest.clearAllMocks()
   })
   it('should return an array of events by category', async () => {
      eventRepository.findEventsByCategory.mockResolvedValue([event]);
      const result = await eventUseCase.findEventsByCategory('Show');
      expect(result).toEqual([event]);
      expect(eventRepository.findEventsByCategory).toHaveBeenCalledWith('Show');
   });
   it('should return an array of events by name', async () => {
      eventRepository.findEventsByName.mockResolvedValue([event]);
      const result = await eventUseCase.findEventsByName('Jorge e Mateus');
      expect(result).toEqual([event]);
      expect(eventRepository.findEventsByName).toHaveBeenCalledWith('Jorge e Mateus');
   });
   it('should return an event by id', async () => {
      eventRepository.findEventById.mockResolvedValueOnce(event);
      const result = await eventUseCase.findEventById('64ea98e6ce38319d7d5d765a');

      expect(result).toEqual(event);
      expect(eventRepository.findEventById).toHaveBeenCalledWith('64ea98e6ce38319d7d5d765a');
   });
})