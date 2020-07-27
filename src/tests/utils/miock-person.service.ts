import { injectable } from "inversify";
import { Person } from "../../interfaces/person.interface";
import { PersonLookup } from "interfaces/person-lookup.interface";

export class MockPersonService implements PersonLookup {

    public getPersons(): Promise<Person[]> {
        return Promise.resolve([]);
    }
}
