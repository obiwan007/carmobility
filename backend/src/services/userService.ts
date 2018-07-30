import * as _ from 'lodash';

import { IStorageService } from './storage';

import { registry } from './registry';

import { User } from '../models/user';

/**
 * Userservice for handling adding/remoping/updating users
 */
export class UserService {
    public storage: IStorageService;

    constructor(storage: IStorageService) {
        this.storage = storage;
    }

    /**
     * Add a User to the store
     * @param user
     */
    public addUser(user: User): User {
        user.id = this.storage.getNextId();
        this.storage.getUser().push(user);
        return user;
    }

    /**
     * Remove User from store - only if user has no bookings on associated with.
     * @param user
     */
    public removeUser(user: User) {
        const found = this.storage.getUser().find(userItem => userItem.id === user.id);
        if (found) {
            if (registry.getBookingService().demandsForUser(user).length > 0) {
                throw (new Error('User has bookings, could not be removed'));
            }
            const userIndex = this.storage.getUser().indexOf(found);
            console.log('UserIndex', userIndex);
            this.storage.getUser().splice(userIndex, 1);
        } else {
            throw (new Error('User not existing'));
        }
    }

    /**
     * Update User from store
     * @param user
     */
    public updateUser(user: User) {
        const foundUser = this.storage.getUser().find(userItem => userItem.id === user.id);
        if (foundUser) {
            _.extend(foundUser, user);
        } else {
            throw (new Error('User not existing'));
        }
    }

    /**
     * Get User via id
     * @param userId
     */
    public getUserFromId(userId: string): User | undefined {
        return this.storage.getUser().find(userItem => userItem.id === userId);
    }

    /**
     * get all users
     */
    public users(): User[] {
        return this.storage.getUser();
    }

}
