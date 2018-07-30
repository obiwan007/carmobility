import * as _ from 'lodash';

import { IStorageService } from './storage';

import { Car } from '../models/car';
import { Demand } from '../models/demands';

import { registry } from './registry';

/**
 * SchedulingService is aresponsible for handling the disposition of cars based on given demands.
 */
export class SchedulingService {
    public storage: IStorageService;

    constructor(storage: IStorageService) {
        this.storage = storage;
    }

    /**
     * Find a car in the car pool to be able to fulfill the given demand.
     * @param demand
     */
    public findCarForDemand(demand: Demand): Car | null {
        let foundCar: Car | null = null;
        registry.getCarService().cars().forEach(car => {
            if (demand.requestedFeatures.infotainment.hasAppleCar && car.infotainment.hasAppleCar
                && demand.requestedFeatures.infotainment.hasGoogleAuto && car.infotainment.hasGoogleAuto
                && demand.requestedFeatures.infotainment.hasNavigation && car.infotainment.hasNavigation
            ) {
                console.log('Infotainment matched');
                if (demand.pickupLocation.address && car.location.address
                ) {
                    console.log('Car is at pickup location');

                    if (!this.checkForCarIsCurrentlyBusy(car)) {
                        console.log('Car is free');
                        foundCar = car;
                    }
                }
            }
        });
        return foundCar;
    }

    /**
     * Check if the car is booked in another Demand and the Demand is in Progress
     * @param car
     */
    public checkForCarIsCurrentlyBusy(car: Car): boolean {
        return false;
    }
}
