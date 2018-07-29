import * as _ from 'lodash';

import { Car } from '../models/car';
import { Location } from '../models/location';

import { Storage, StorageInstance } from './storage';

/**
 * CarService class for handling all requests related to cars.
 */
export class CarService {
    private storage: Storage = StorageInstance;
    /**
     * Add a new car to the pool. The id will be generated.
     * @param car
     */
    public addCar(car: Car) {
        car.id = this.storage.getNextId();
        this.storage.getCars().push(car);
    }

    /**
     * Remove a car from the pool.
     * @param car
     */
    public removeCar(car: Car) {
        const found = this.storage.getCars().find(carItem => carItem.id === car.id);
        if (found) {
            const carIndex = this.storage.getCars().indexOf(found);
            this.storage.getCars().splice(carIndex, 1);
        } else {
            throw (new Error('Car not existing'));
        }
    }
    /**
     * Update a car inside the storage.
     * The data will be copied from the given object to the stored data object.
     * @param car
     */
    public updateCar(car: Car) {
        const foundCar = this.storage.getCars().find(carItem => carItem.id === car.id);
        if (foundCar) {
            _.extend(foundCar, car);
        } else {
            throw (new Error('Car not existing'));
        }
    }
    /**
     * Retrieve a car based on given id
     * @param id Id of the car
     */
    public getCarById(id: string): Car | undefined {
        return this.storage.getCars().find(carItem => carItem.id === id);
    }

    /**
     * Save a new location to a given car identified via id
     * @param carId
     * @param location
     */
    public setCarLocation(carId: string, location: Location): Car | undefined {
        const car = this.getCarById(carId);
        if (car) {
            car!.location = location;
            return car;
        } else {
            throw (new Error('Car not existing'));
        }
    }

    /**
     * Get list of stored cars
     */
    public cars(): Car[] {
        return this.storage.getCars();
    }
}
export const carService = new CarService();
