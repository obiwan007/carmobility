import * as _ from 'lodash';

import { Storage, StorageInstance } from './storage';

import { Car } from '../models/car';
import { Demand } from '../models/demands';

import { carService } from './carService';

import { bookingService } from './bookingService';

export class SchedulingService {
    public storage: Storage = StorageInstance;
    public findCarForDemand(demand: Demand): Car | null {
        let foundCar: Car | null = null;
        carService.cars().forEach(car => {
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
     *
     * @param car Check if the car is booked in another Demand and the Demand is in Progress
     */
    public checkForCarIsCurrentlyBusy(car: Car): boolean {
        return false;
    }

}
export const schedulingService = new SchedulingService();
