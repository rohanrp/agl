import PersonService from "../services/person.service";
import { MockPersonService } from "./utils/miock-person.service";
import { Person } from "../interfaces/person.interface";
import { Pet } from "interfaces/pet.interface";

describe('Testing Persons Service', () => {

  let personService;
  let mockRemotePersonService;

  beforeEach(() => {
    personService = new PersonService();
    mockRemotePersonService = new MockPersonService();
    personService.remotePersonService = mockRemotePersonService;
  });

  describe('getPersons', () => {
    it('should get a list of Persons', async () => {
      mockRemotePersonService.getPersons = () => Promise.resolve([
        { 'name': "Samantha", 'gender': "Female", 'age': 40, 'pets': [ { 'name': "Tabby", 'type': "Cat" } ] },
        { 'name': "JIM", 'gender': "Male", 'age': 40, 'pets': [ { 'name': "Locky", 'type': "Cat" } ] }
      ]);
      const personsReturned: Person[] = await personService.getPersons();
      expect(personsReturned.length).toBe(2);
      expect(personsReturned[0].name).toBe('Samantha');
      expect(personsReturned[1].name).toBe('JIM');
    });
  })


  describe('getPersonByCategory', () => {
    it('should get a list of Persons by category heading', async () => {
      mockRemotePersonService.getPersons = () => Promise.resolve([
        { 'name': "Samantha", 'gender': "Female", 'age': 40, 'pets': [ { 'name': "Tabby", 'type': "Cat" } ] },
        { 'name': "JIM", 'gender': "Male", 'age': 40, 'pets': [ { 'name': "Locky", 'type': "Cat" } ] }
      ]);
      const returnedData: {[x: string]: Pick<Person, never>[]} = await personService.getPersonByCategory('gender');
      expect(Object.keys(returnedData).length).toBe(2);
      expect(returnedData.hasOwnProperty('Male')).toBe(true);
      expect(returnedData.hasOwnProperty('Female')).toBe(true);
      expect(returnedData['Male'].length).toBe(1);
      expect(returnedData['Female'].length).toBe(1);
      expect((<Person> returnedData['Male'][0]).name).toBe('JIM');
      expect((<Person> returnedData['Female'][0]).name).toBe('Samantha');
    });
  })


  describe('getPersonByCategoryOwnerships', () => {
    it('should get a list of Persons ownership by category heading', async () => {
      mockRemotePersonService.getPersons = () => Promise.resolve([
        { 'name': "Samantha", 'gender': "Female", 'age': 40, 'pets': [ { 'name': "Tabby", 'type': "Cat" } ] },
        { 'name': "JIM", 'gender': "Male", 'age': 40, 'pets': [ { 'name': "Locky", 'type': "Cat" } ] }
      ]);
      const returnedData: {[topLevelCategory: string]: any[]} = await personService.getPersonByCategoryOwnerships('gender', 'pets');
      expect(Object.keys(returnedData).length).toBe(2);
      expect(returnedData.hasOwnProperty('Male')).toBe(true);
      expect(returnedData.hasOwnProperty('Female')).toBe(true);
      expect(returnedData['Male'].length).toBe(1);
      expect(returnedData['Female'].length).toBe(1);
      expect((<Pet> returnedData['Male'][0]).name).toBe('Locky');
      expect((<Pet> returnedData['Female'][0]).name).toBe('Tabby');
    });
  })


  describe('getPersonByCategoryFilteredOwnerships', () => {
    it('should get a list of Persons filtered ownership by category heading', async () => {
      mockRemotePersonService.getPersons = () => Promise.resolve([
        { 'name': "Samantha", 'gender': "Female", 'age': 40, 'pets': [ { 'name': "Tabby", 'type': "Cat" } ] },
        { 'name': "JIM", 'gender': "Male", 'age': 40, 'pets': [ { 'name': "Locky", 'type': "Cat" } ] }
      ]);
      const returnedData: {[topLevelCategory: string]: any[]} = await personService.getPersonByCategoryFilteredOwnerships('gender', 'pets', 'type', 'Cat', 'name');
      expect(Object.keys(returnedData).length).toBe(2);
      expect(returnedData.hasOwnProperty('Male')).toBe(true);
      expect(returnedData.hasOwnProperty('Female')).toBe(true);
      expect(returnedData['Male'].length).toBe(1);
      expect(returnedData['Female'].length).toBe(1);
      expect((<string> returnedData['Male'][0])).toBe('Locky');
      expect((<string> returnedData['Female'][0])).toBe('Tabby');
    });
  })
});
