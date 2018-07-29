import { Engine, Infotainment } from './car';
import { Location } from './location';

/**
 * Available states of a Demand object.
 */
export enum States {
    open,
    inProgress,
    fulfilled,
}
/**
 * Feature of a request for a car.
 */
export class Feature {
    public infotainment: Infotainment;
    public engine: Engine;
}

/**
 * Demand a car at a given time. Also containing the state of fulfillment.
 */
export class Demand {
    public id: string;
    public created: Date;
    public pickupTime: Date;
    public dropOffTime: Date;
    public pickupLocation: Location;
    public dropOffLocation: Location;
    public requestedFeatures: Feature;
    public userId: string;
    public state: States;
    public assignedCarId: string;
}
