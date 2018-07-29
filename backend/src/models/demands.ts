import { Engine, Infotainment } from './car';
import { Location } from './location';

export enum States {
    open,
    inProgress,
    fulfilled,
}

export class Feature {
    public infotainment: Infotainment;
    public engine: Engine;
}

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
