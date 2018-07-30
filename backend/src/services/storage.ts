import { Car } from '../models/car';
import { Demand } from '../models/demands';
import { User } from '../models/user';

/**
 * Storage inteface class
 */
export interface IStorageService {
    getCars(): Car[];
    getUser(): User[];
    getDemands(): Demand[];
    getNextId(): string;
}

/**
 * Basic In-Memory storage implementation
 */
export class StorageService implements IStorageService {
    private id: number = 0;
    private cars: Car[] = [];
    private users: User[] = [];
    private demands: Demand[] = [];
    public getCars(): Car[] {
        return this.cars;
    }
    public getUser(): User[] {
        return this.users;
    }
    public getDemands(): Demand[] {
        return this.demands;
    }
    public getNextId(): string {
        return (this.id++).toString();
    }
}
