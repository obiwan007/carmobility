import { registry } from '../src/services/registry';

import { Demand } from '../src/models/demands';
import { User } from '../src/models/user';
import { StorageService } from '../src/services/storage';

/**
 * Create some dummy users
 */
const initUsers = () => {
    {
        const user = new User();
        const added = registry.getUserService().addUser(user);
        expect(added.id).toBe('0');
    }
    {
        const user = new User();
        const added = registry.getUserService().addUser(user);
        expect(added.id).toBe('1');
    }
};

/**
 * Unittestes based on requirements of the management service document
 */
describe('UserService Tests', () => {

    beforeEach(() => {
        // Create a new instance of the storage for each test to have a clean database as a a start.
        registry.init(new StorageService());
    });

    it('add user with autoincrement id', () => {
        {
            const user = new User();
            const added = registry.getUserService().addUser(user);
            expect(added.id).toBe('0');
        }
        {
            const user = new User();
            const added = registry.getUserService().addUser(user);
            expect(added.id).toBe('1');
        }
    });

    it('delete User', () => {
        initUsers();
        const count = registry.getUserService().users().length;
        const user = new User();
        user.id = '0';
        registry.getUserService().removeUser(user);
        expect(registry.getUserService().users().length).toBe(count - 1);
    });

    it('delete User who has bookings', () => {
        initUsers();
        const count = registry.getUserService().users().length;
        const demand = new Demand();
        demand.userId = '1';
        registry.getBookingService().addDemand(demand);
        const user = new User();
        user.id = '1';
        try {
            registry.getUserService().removeUser(user);
            fail();
        } catch (ex) {
            expect(registry.getUserService().users().length).toBe(count);
        }
    });

    it('update User', () => {
        initUsers();
        const user = registry.getUserService().getUserFromId('1');
        user.name = 'Heinz';
        registry.getUserService().updateUser(user);
        const userUpdated = registry.getUserService().getUserFromId('1');
        expect(userUpdated.name).toBe('Heinz');
    });
});
