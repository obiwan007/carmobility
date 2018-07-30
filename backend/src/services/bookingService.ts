import * as _ from 'lodash';

import { IStorageService } from './storage';

import { Demand } from '../models/demands';
import { User } from '../models/user';

import { registry } from './registry';

/**
 * Bookingservice class for handling all demands for cars. Used via the SchedulingService to actually assign a car.
 */
export class BookingService {
    public storage: IStorageService;
    constructor(storage: IStorageService) {
        this.storage = storage;
    }

    /**
     * Add a new demand to the store
     * @param demand
     */
    public addDemand(demand: Demand) {
        if (registry.getUserService().getUserFromId(demand.userId)) {
            demand.id = this.storage.getNextId();
            this.storage.getDemands().push(demand);
        } else {
            throw (new Error('User not existing'));
        }
    }

    /**
     * Remove a demand from store
     * @param demand
     */
    public removeDemand(demand: Demand) {
        const found = this.storage.getDemands().find(demandItem => demandItem.id === demand.id);
        if (found) {
            const carIndex = this.storage.getDemands().indexOf(found);
            this.storage.getDemands().splice(carIndex, 1);
        } else {
            throw (new Error('Demand not existing'));
        }
    }

    /**
     * Update a given demand in store
     * @param demand
     */
    public updateDemand(demand: Demand) {
        const foundDemand = this.storage.getDemands().find(demandItem => demandItem.id === demand.id);
        if (foundDemand) {
            _.extend(foundDemand, demand);
        } else {
            throw (new Error('Demand not existing'));
        }
    }

    /**
     * Get all demands assigned to a given user
     * @param user
     */
    public demandsForUser(user: User): Demand[] {
        return this.storage.getDemands().filter(demandItem => demandItem.userId === user.id);
    }

    /**
     * get all demands
     */
    public demands(): Demand[] {
        return this.storage.getDemands();
    }
}
