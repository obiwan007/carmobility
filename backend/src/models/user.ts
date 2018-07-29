enum Sex {
    male,
    female,
    unknown,
}

export class User {
    public id: string;
    public name: string;
    public age: number;
    public gender: Sex;
}
