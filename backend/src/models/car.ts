import { Location } from './location';

export class Engine {
    public id: string;
    public model: string;
    public identifier: string;
    public power: number;
    public torque: number;
}

export class Interior {
    public color: string;
    public seats: number;
}

export class Infotainment {
    public hasNavigation: boolean;
    public hasAppleCar: boolean;
    public hasGoogleAuto: boolean;
}

export class Car {
    public id: string;
    public brand: string;
    public model: string;
    public color: string;
    public identifier: string;
    public milage: number;
    public engineType: Engine;
    public location: Location;
    public infotainment: Infotainment;
    public interior: Interior;
}
