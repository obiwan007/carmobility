import { bookingService } from '../src/services/bookingService';
import { userService } from '../src/services/userService';

import { Demand } from '../src/models/demands';
import { User } from '../src/models/user';

/**
 * Unittestes based on requirements of the management service document
 */
describe('UserService Tests', () => {

    it('add user with autoincrement id', () => {
        {
            const user = new User();
            const added = userService.addUser(user);
            expect(added.id).toBe('0');
        }
        {
            const user = new User();
            const added = userService.addUser(user);
            expect(added.id).toBe('1');
        }
    });

    it('delete User', () => {
        console.log('Users:', userService.users());
        const count = userService.users().length;
        const user = new User();
        user.id = '0';
        userService.removeUser(user);
        expect(userService.users().length).toBe(count - 1);
    });

    it('delete User who has bookings', () => {
        console.log('Users:', userService.users());
        const count = userService.users().length;
        const demand = new Demand();
        demand.userId = '1';
        bookingService.addDemand(demand);
        const user = new User();
        user.id = '1';
        try {
            userService.removeUser(user);
            fail();
        } catch (ex) {
            expect(userService.users().length).toBe(count);
        }
    });

    it('update User', () => {
        console.log('Users:', userService.users());
        const user = userService.getUserFromId('1');
        user.name = 'Heinz';
        userService.updateUser(user);
        const userUpdated = userService.getUserFromId('1');
        expect(userUpdated.name).toBe('Heinz');
    });

});
