import * as _ from 'lodash';

import { Storage, StorageInstance } from './storage';

import { Demand } from '../models/demands';
import { User } from '../models/user';

import { userService } from './userService';

export class BookingService {
    public storage: Storage = StorageInstance;
    public addDemand(demand: Demand) {
        if (userService.getUserFromId(demand.userId)) {
            demand.id = this.storage.getNextId();
            this.storage.getDemands().push(demand);
        } else {
            throw (new Error('User not existing'));
        }
    }

    public removeDemand(demand: Demand) {
        const found = this.storage.getDemands().find(demandItem => demandItem.id === demand.id);
        if (found) {
            const carIndex = this.storage.getDemands().indexOf(found);
            this.storage.getDemands().splice(carIndex, 1);
        } else {
            throw (new Error('Demand not existing'));
        }
    }
    public updateDemand(demand: Demand) {
        const foundDemand = this.storage.getDemands().find(demandItem => demandItem.id === demand.id);
        if (foundDemand) {
            _.extend(foundDemand, demand);
        } else {
            throw (new Error('Demand not existing'));
        }
    }

    public demandsForUser(user: User): Demand[] {
        return this.storage.getDemands().filter(demandItem => demandItem.userId === user.id);
    }

    public demands(): Demand[] {
        return this.storage.getDemands();
    }
}
export const bookingService = new BookingService();
