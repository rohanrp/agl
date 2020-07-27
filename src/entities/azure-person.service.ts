import { injectable } from "inversify";
import { Person } from "../interfaces/person.interface";
import { PersonLookup } from "interfaces/person-lookup.interface";

const axios = require('axios').default;

@injectable()
export class AzurePersonService implements PersonLookup {

    public getPersons(): Promise<Person[]> {
        return new Promise((resolve, reject) => {
            axios.get(process.env.PERSON_URL)
                .catch((error: any) => {
                    reject(error);
                })
                .then((response: any) => {
                    const persons = response.data as Person[];
                    resolve(persons);
                });
        });
    }
}
