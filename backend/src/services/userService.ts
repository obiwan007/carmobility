import * as _ from 'lodash';

import { Storage, StorageInstance } from './storage';

import { bookingService } from './bookingService';

import { User } from '../models/user';

/**
 * Userservice for handling adding/remoping/updating users
 */
export class UserService {
    public storage: Storage = StorageInstance;
    public addUser(user: User): User {
        user.id = this.storage.getNextId();
        this.storage.getUser().push(user);
        return user;
    }

    public removeUser(user: User) {
        const found = this.storage.getUser().find(userItem => userItem.id === user.id);
        if (found) {
            if (bookingService.demandsForUser(user).length > 0) {
                throw (new Error('User has bookings, could not be removed'));
            }
            const userIndex = this.storage.getUser().indexOf(found);
            console.log('UserIndex', userIndex);
            this.storage.getUser().splice(userIndex, 1);
        } else {
            throw (new Error('User not existing'));
        }
    }
    public updateUser(user: User) {
        const foundUser = this.storage.getUser().find(userItem => userItem.id === user.id);
        if (foundUser) {
            _.extend(foundUser, user);
        } else {
            throw (new Error('User not existing'));
        }
    }

    public getUserFromId(userId: string): User | undefined {
        return this.storage.getUser().find(userItem => userItem.id === userId);
    }

    public users(): User[] {
        return this.storage.getUser();
    }

}

export const userService = new UserService();
