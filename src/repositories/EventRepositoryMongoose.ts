import mongoose from "mongoose";
import { Event } from "../entities/Event";
import { EventRepository } from "./EventRepository";
import { Location } from "../entities/Location";

const eventSchema = new mongoose.Schema({
   title: String,
   location: {
      longitude: String,
      latitude: String
   },
   date: Date,
   createdAt: {
      type: Date,
      default: Date.now
   },
   description: String,
   categories: [String],
   banner: String,
   flyers: [String], // string because only url is stored
   price: {
      type: Array,
   },
   city: String,
   participants: {
      type: Array,
      ref: 'User'
   }
});

const EventModel = mongoose.model('Event', eventSchema);

class EventRepositoryMongoose implements EventRepository {
   async add(event: Event): Promise<Event> {
      const eventModel = new EventModel(event);
      
      await eventModel.save();
      return event;
   }

   async findByLocationAndDate(location: Location, date: Date): Promise<Event | undefined> {
      const findEvent = await EventModel.findOne({ location, date }).exec();

      return findEvent ? findEvent.toObject() : undefined;
   }

   async findEventsByCity(city: string): Promise<Event[]> {
      const findEvents = await EventModel.find({ city }).exec();

      return findEvents.map(event => event.toObject());
   }

   async findEventsByCategory(category: string): Promise<Event[]> {
      const findEvents = await EventModel.find({ categories: category }).exec();

      return findEvents.map(event => event.toObject());
   }
}

export { EventRepositoryMongoose };