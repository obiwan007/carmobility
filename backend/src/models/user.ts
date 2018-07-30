/**
 * Enumeration of gender informations
 */
enum Sex {
    male,
    female,
    unknown,
}

/**
 * Model class for the User
 */
export class User {
    public id: string;
    public name: string;
    public age: number;
    public gender: Sex;
}
