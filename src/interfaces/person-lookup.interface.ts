import { Person } from "../interfaces/person.interface";

export interface PersonLookup {
    getPersons(): Promise<Person[]>;
}
