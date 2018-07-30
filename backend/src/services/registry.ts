import { BookingService } from './bookingService';
import { CarService } from './carService';
import { SchedulingService } from './schedulingService';
import { IStorageService } from './storage';
import { UserService } from './userService';

/**
 * Registry of all services.
 * It is using dependency injection to inject the IStorageService instance to all the services.
 */
export class Registry {
  private userService: UserService;
  private carService: CarService;
  private bookingService: BookingService;
  private schedulingService: SchedulingService;
  private storageService: IStorageService;

  /**
   * initialize registry with the given storage system.
   * This must be called before any other service was called.
   */
  public init(storage: IStorageService) {
    this.storageService = storage;
    this.userService = new UserService(this.storageService);
    this.carService = new CarService(this.storageService);
    this.bookingService = new BookingService(this.storageService);
    this.schedulingService = new SchedulingService(this.storageService);
  }
  public getUserService(): UserService {
    return this.userService;
  }

  public getCarService(): CarService {
    return this.carService;
  }

  public getBookingService(): BookingService {
    return this.bookingService;
  }
  public getSchedulingService(): SchedulingService {
    return this.schedulingService;
  }
}

/**
 * Singleton instance of registry.
 */
export const registry = new Registry();
