import { Location } from './location';

/**
 * Engine specification of a car
 */
export class Engine {
    public id: string;
    public model: string;
    public identifier: string;
    public power: number;
    public torque: number;
    public milage: number;  // Milage of the given Engine. This is stored seperately from the car milage and could differ here.
}

/**
 * Configuration of the interior of a car.
 */
export class Interior {
    public color: string;
    public seats: number;
}

/**
 * Configuration of the infotainment system of the car.
 */
export class Infotainment {
    public hasNavigation: boolean;
    public hasAppleCar: boolean;
    public hasGoogleAuto: boolean;
}

/**
 * Model/Schema class for a Car.
 */
export class Car {
    public id: string;
    public brand: string;
    public model: string;
    public color: string;
    public identifier: string;
    public milage: number;  // Milage of car. Engine has a different milage store.
    public engine: Engine;
    public location: Location;
    public infotainment: Infotainment;
    public interior: Interior;
}
