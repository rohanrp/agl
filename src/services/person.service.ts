import { Person } from '../interfaces/person.interface';
import { omit, groupBy, mapValues, sortedUniq } from 'lodash';
import container from "../config/ioc-config";
import { PersonLookup } from '../interfaces/person-lookup.interface';
import SERVICE_IDENTIFIER from '../constants/identifiers';


class PersonService {
  public remotePersonService = container.get<PersonLookup>(SERVICE_IDENTIFIER.REMOTE_WEB_SERVICE);

  /**
   * @return {string[]} A list of persons
 */
  public getPersons(): Promise<Person[]> {
    return this.remotePersonService.getPersons();
  }

  /**
   * Return a list of persons within a category heading
   * @param {string} categoryName
   * @return {{[x: string]: Pick<Person, never>[]}} Category list
 */
  public async getPersonByCategory(categoryName: string): Promise<{[x: string]: Pick<Person, never>[]}> {
    const persons: Person[] = await this.getPersons();
    return Promise.resolve(mapValues(groupBy(persons, categoryName), list => list.map(person => omit(person, categoryName))));
  }


  /**
   * Return a list of what a person owns within a category heading
   * @param {string} categoryName
   * @param {string} ownershipOfCategory
   * @return {{[topLevelCategory: string]: any[]}} Category list
 */
  public async getPersonByCategoryOwnerships(categoryName: string, ownershipOfCategory: string): Promise<{[topLevelCategory: string]: any[]}> {
    const personGrouping: {[x: string]: Pick<Person, never>[] } = await this.getPersonByCategory(categoryName);
    const personGroupingOwnerships: {[topLevelCategory: string]: any[]} = {};
    Object.keys(personGrouping).forEach((topLevelCategory: string) => {
      personGroupingOwnerships[topLevelCategory] = [];
      personGrouping[topLevelCategory]
        .forEach((person: Person) =>  Array.isArray(person[ownershipOfCategory]) ? personGroupingOwnerships[topLevelCategory].push(...person[ownershipOfCategory]) : null);
        personGroupingOwnerships[topLevelCategory]  = personGroupingOwnerships[topLevelCategory].sort();
    });
    return Promise.resolve(personGroupingOwnerships);
  }


  /**
   * Return a list of what a person spcifically owns  within a category heading
   * @param {string} categoryName
   * @param {string} ownershipOfCategory
   * @param {string} fiterType
   * @param {string} filterValue
   * @param {string} ownershipProperty
   * @return {{[topLevelCategory: string]: any[]}} Category list
 */
  public async getPersonByCategoryFilteredOwnerships(categoryName: string, ownershipOfCategory: string, fiterType: string, filterValue: string, ownershipProperty: string): Promise<{[topLevelCategory: string]: any[]}> {
    const personByCategoryOwnerships: {[topLevelCategory: string]: any[]} = await this.getPersonByCategoryOwnerships(categoryName, ownershipOfCategory);
    const personByCategoryFilteredOwnerships: {[topLevelCategory: string]: any[]} = {};
    Object.keys(personByCategoryOwnerships).forEach((topLevelCategory: string) => {
      personByCategoryFilteredOwnerships[topLevelCategory] = [];
      personByCategoryOwnerships[topLevelCategory]
        .forEach((ownership: {[key: string]: any}) => {
          if (ownership.hasOwnProperty(fiterType) && !!ownership[fiterType] && ownership[fiterType] === filterValue) {
            if (ownership.hasOwnProperty(ownershipProperty)) {
              personByCategoryFilteredOwnerships[topLevelCategory].push(ownership[ownershipProperty]);
            }
          }
        });
        personByCategoryFilteredOwnerships[topLevelCategory]  = personByCategoryFilteredOwnerships[topLevelCategory].sort();
    });
    return Promise.resolve(personByCategoryFilteredOwnerships);
  }

}

export default PersonService;
